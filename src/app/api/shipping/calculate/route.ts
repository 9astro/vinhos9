import { NextRequest, NextResponse } from 'next/server';
import { calculateShipping } from '@/lib/shipping';

export async function POST(req: NextRequest) {
  try {
    const { zip, items } = await req.json();

    const products = items.map((item: any) => ({
      id: item.id,
      width: 10,
      height: 35,
      length: 10,
      weight: 1.3,
      quantity: item.quantity,
      insurance_value: item.price * item.quantity,
    }));

    const result = await calculateShipping({ to_postal_code: zip, products });

    // Filter only valid options (without error)
    const options = Array.isArray(result)
      ? result.filter((r: any) => !r.error && r.price).map((r: any) => ({
          id: r.id,
          name: r.name,
          price: r.price,
          delivery_time: r.delivery_time,
          company: r.company,
        }))
      : [];

    return NextResponse.json({ options });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
