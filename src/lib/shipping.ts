const MELHOR_ENVIO_URL = process.env.MELHOR_ENVIO_SANDBOX === 'true'
  ? 'https://sandbox.melhorenvio.com.br/api/v2'
  : 'https://melhorenvio.com.br/api/v2';

interface ShippingCalcParams {
  to_postal_code: string;
  products: Array<{ id: string; width: number; height: number; length: number; weight: number; quantity: number; insurance_value: number }>;
}

export async function calculateShipping(params: ShippingCalcParams) {
  const res = await fetch(`${MELHOR_ENVIO_URL}/me/shipment/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
      'User-Agent': 'Vinheria Premium (contato@vinheria.com.br)',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      from: { postal_code: process.env.STORE_ZIP_CODE },
      to: { postal_code: params.to_postal_code.replace(/\D/g, '') },
      products: params.products,
      services: '1,2,17', // Correios PAC, SEDEX + JadLog
      options: { insurance_value: 0, receipt: false, own_hand: false },
    }),
  });

  if (!res.ok) throw new Error('Erro ao calcular frete');
  return res.json();
}

export async function addToCart(orderId: string, items: unknown[]) {
  const res = await fetch(`${MELHOR_ENVIO_URL}/me/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
      'User-Agent': 'Vinheria Premium (contato@vinheria.com.br)',
    },
    body: JSON.stringify({ service: 1, agency: null, from: { postal_code: process.env.STORE_ZIP_CODE }, ...items }),
  });
  return res.json();
}
