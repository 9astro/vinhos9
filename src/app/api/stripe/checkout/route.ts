import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { items, shippingOption, couponCode, discount } = await req.json();

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          images: item.images?.[0]?.url ? [item.images[0].url] : [],
          metadata: { product_id: item.id },
        },
        unit_amount: Math.round((item.promo_price ?? item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const shippingCost = shippingOption ? Math.round(parseFloat(shippingOption.price) * 100) : 0;

    // Create order in DB first
    const subtotal = items.reduce((sum: number, i: any) => sum + (i.promo_price ?? i.price) * i.quantity, 0);
    const total = Math.max(subtotal + parseFloat(shippingOption?.price ?? '0') - (discount ?? 0), 0);

    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id ?? null,
        status: 'pending',
        subtotal,
        shipping_cost: parseFloat(shippingOption?.price ?? '0'),
        discount: discount ?? 0,
        coupon_code: couponCode ?? null,
        total,
      })
      .select()
      .single();

    // Insert order items
    if (order) {
      await supabase.from('order_items').insert(
        items.map((i: any) => ({
          order_id: order.id,
          product_id: i.id,
          quantity: i.quantity,
          unit_price: i.promo_price ?? i.price,
        }))
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'pt-BR',
      currency: 'brl',
      customer_email: user?.email,
      metadata: { order_id: order?.id ?? '' },
      shipping_options: shippingCost > 0 ? [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: shippingCost, currency: 'brl' },
          display_name: shippingOption.name,
          delivery_estimate: {
            minimum: { unit: 'business_day', value: shippingOption.delivery_time },
            maximum: { unit: 'business_day', value: shippingOption.delivery_time + 2 },
          },
        },
      }] : [],
      discounts: discount > 0 ? [] : [],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // Update order with stripe session id
    if (order) {
      await supabase.from('orders').update({ stripe_session_id: session.id }).eq('id', order.id);
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
