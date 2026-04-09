import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    const supabase = createAdminClient();

    const { data: coupon } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (!coupon) return NextResponse.json({ valid: false, message: 'Cupom não encontrado' });

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: 'Cupom expirado' });
    }
    if (coupon.max_uses && coupon.uses >= coupon.max_uses) {
      return NextResponse.json({ valid: false, message: 'Cupom esgotado' });
    }
    if (coupon.min_order && subtotal < coupon.min_order) {
      return NextResponse.json({ valid: false, message: `Pedido mínimo de R$ ${coupon.min_order.toFixed(2)}` });
    }

    const discount = coupon.type === 'percentage'
      ? (subtotal * coupon.value) / 100
      : coupon.value;

    // Increment usage
    await supabase.from('coupons').update({ uses: coupon.uses + 1 }).eq('id', coupon.id);

    return NextResponse.json({ valid: true, code: coupon.code, discount: Math.min(discount, subtotal) });
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: 'Erro ao validar cupom' }, { status: 500 });
  }
}
