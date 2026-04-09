import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      await supabase.from('orders').update({ status: 'paid' }).eq('id', orderId);
      await supabase.from('payments').insert({
        order_id: orderId,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string,
        amount: (session.amount_total ?? 0) / 100,
        status: 'paid',
        method: session.payment_method_types?.[0] ?? 'card',
      });

      // Decrement stock
      const { data: orderItems } = await supabase.from('order_items').select('product_id, quantity').eq('order_id', orderId);
      for (const item of orderItems ?? []) {
        await supabase.rpc('decrement_stock', { product_id: item.product_id, qty: item.quantity });
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId);
    }
  }

  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } };
