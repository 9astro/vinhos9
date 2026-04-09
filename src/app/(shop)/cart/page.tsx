'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, total, shippingOption, setShipping, setZipCode, zipCode, couponCode, applyCoupon, discount } = useCart();
  const [zip, setZip] = useState(zipCode);
  const [loadingShip, setLoadingShip] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [coupon, setCoupon] = useState(couponCode ?? '');
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const calcShipping = async () => {
    if (!zip || zip.replace(/\D/g, '').length < 8) return toast.error('CEP inválido');
    setLoadingShip(true);
    try {
      const res = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip, items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.promo_price ?? i.price })) }),
      });
      const data = await res.json();
      setShippingOptions(data.options ?? []);
      setZipCode(zip);
    } catch {
      toast.error('Erro ao calcular frete');
    } finally {
      setLoadingShip(false);
    }
  };

  const applyCouponCode = async () => {
    if (!coupon) return;
    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: coupon, subtotal: subtotal() }),
      });
      const data = await res.json();
      if (data.valid) {
        applyCoupon(data.code, data.discount);
        toast.success(`Cupom aplicado: -${formatCurrency(data.discount)}`);
      } else {
        toast.error(data.message ?? 'Cupom inválido');
      }
    } catch {
      toast.error('Erro ao validar cupom');
    }
  };

  const handleCheckout = async () => {
    if (!shippingOption) return toast.error('Selecione uma opção de frete');
    setLoadingCheckout(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingOption, couponCode, discount }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      toast.error('Erro ao iniciar checkout');
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 flex items-center justify-center px-4">
          <div className="text-center flex flex-col items-center gap-6">
            <ShoppingBag className="w-16 h-16 text-graphite-700" />
            <div>
              <h2 className="font-serif text-2xl text-off-white mb-2">Seu carrinho está vazio</h2>
              <p className="text-graphite-500 font-sans">Descubra nossa seleção de vinhos premium</p>
            </div>
            <Link href="/catalog" className="btn-gold">Explorar Catálogo</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="font-serif text-3xl font-bold text-off-white mb-8">Meu Carrinho</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 bg-graphite-900 border border-graphite-800 rounded-xl p-4">
                  <div className="relative w-20 h-20 bg-graphite-800 rounded-lg overflow-hidden flex-shrink-0">
                    {item.images?.[0]?.url ? (
                      <Image src={item.images[0].url} alt={item.name} fill className="object-contain p-1" sizes="80px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">🍷</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-off-white font-semibold line-clamp-1">{item.name}</h3>
                    <p className="text-graphite-500 text-xs font-sans mt-0.5">{item.country}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-graphite-700 rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2.5 py-1.5 text-graphite-400 hover:text-off-white hover:bg-graphite-800 transition-colors text-sm">−</button>
                        <span className="px-3 py-1.5 text-off-white font-sans text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2.5 py-1.5 text-graphite-400 hover:text-off-white hover:bg-graphite-800 transition-colors text-sm">+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-gold-400">{formatCurrency((item.promo_price ?? item.price) * item.quantity)}</span>
                        <button onClick={() => removeItem(item.id)} className="text-graphite-600 hover:text-bordeaux-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-4">
              {/* Shipping */}
              <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6">
                <h3 className="font-serif text-lg text-off-white mb-4">Calcular Frete</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={zip}
                    onChange={e => setZip(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9))}
                    className="input-field flex-1"
                    maxLength={9}
                  />
                  <button onClick={calcShipping} disabled={loadingShip} className="btn-outline px-4 py-3">
                    {loadingShip ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ok'}
                  </button>
                </div>

                {shippingOptions.length > 0 && (
                  <div className="flex flex-col gap-2 mt-4">
                    {shippingOptions.map((opt: any) => (
                      <label key={opt.id} className="flex items-center gap-3 p-3 border border-graphite-700 rounded-lg cursor-pointer hover:border-gold-500/40 transition-colors">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption?.id === opt.id}
                          onChange={() => setShipping(opt)}
                          className="accent-gold-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-off-white text-sm font-sans font-medium">{opt.name}</p>
                          <p className="text-graphite-500 text-xs font-sans">{opt.delivery_time} dias úteis</p>
                        </div>
                        <span className="text-gold-400 font-sans font-semibold text-sm">{opt.price === '0.00' ? 'Grátis' : `R$ ${opt.price}`}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Coupon */}
              <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6">
                <h3 className="font-serif text-lg text-off-white mb-4">Cupom de Desconto</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="CÓDIGO" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} className="input-field flex-1 uppercase tracking-widest" />
                  <button onClick={applyCouponCode} className="btn-outline px-4 py-3 text-sm">Aplicar</button>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6">
                <h3 className="font-serif text-lg text-off-white mb-4">Resumo</h3>
                <div className="flex flex-col gap-3 text-sm font-sans">
                  <div className="flex justify-between text-graphite-300">
                    <span>Subtotal</span><span>{formatCurrency(subtotal())}</span>
                  </div>
                  {shippingOption && (
                    <div className="flex justify-between text-graphite-300">
                      <span>Frete</span>
                      <span>{parseFloat(shippingOption.price) === 0 ? 'Grátis' : `R$ ${shippingOption.price}`}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Desconto</span><span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-graphite-800 pt-3 flex justify-between items-baseline">
                    <span className="font-serif text-off-white font-semibold">Total</span>
                    <span className="font-serif text-2xl text-gold-400 font-bold">{formatCurrency(total())}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loadingCheckout}
                  className="btn-gold w-full mt-6 py-4 text-base"
                >
                  {loadingCheckout ? <Loader2 className="w-5 h-5 animate-spin" /> : (<>Finalizar Compra <ArrowRight className="w-4 h-4" /></>)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
