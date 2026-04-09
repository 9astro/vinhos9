'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, Heart, Share2, ChevronDown, ChevronUp, Star, Wine } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency, getDiscountPercentage, categoryLabels } from '@/lib/utils';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

export function ProductClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState<string | null>('description');
  const { addItem } = useCart();

  const hasPromo = !!product.promo_price;
  const currentPrice = hasPromo ? product.promo_price! : product.price;
  const discount = hasPromo ? getDiscountPercentage(product.price, product.promo_price!) : 0;

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty}x ${product.name} adicionado ao carrinho`);
  };

  const sections = [
    { id: 'description', label: 'Descrição', content: product.description },
    { id: 'tasting', label: 'Notas de Degustação', content: product.tasting_notes },
    { id: 'pairing', label: 'Harmonização', content: product.pairing },
  ].filter(s => s.content);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square bg-graphite-900 rounded-2xl overflow-hidden border border-graphite-800">
            {product.images?.[activeImage]?.url ? (
              <Image
                src={product.images[activeImage].url}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">🍷</div>
            )}
            {hasPromo && (
              <div className="absolute top-4 left-4 badge bg-bordeaux-800 text-gold-300 text-sm px-3 py-1">
                -{discount}% OFF
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={cn('relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors', i === activeImage ? 'border-gold-500' : 'border-graphite-800 hover:border-graphite-600')}
                >
                  <Image src={img.url} alt={img.alt ?? ''} fill className="object-contain p-1" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Category + Country */}
          <div className="flex items-center gap-2">
            <span className="badge bg-bordeaux-800/50 text-bordeaux-300">{categoryLabels[product.category]}</span>
            {product.country && <span className="text-graphite-500 text-sm font-sans">{product.country}{product.region ? ` · ${product.region}` : ''}</span>}
          </div>

          {/* Name */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-off-white leading-tight">{product.name}</h1>
            {product.vintage && (
              <p className="text-graphite-400 font-sans mt-1">Safra {product.vintage}</p>
            )}
          </div>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-gold-400 fill-gold-400" />)}
            </div>
            <span className="text-graphite-500 text-sm font-sans">(4.9) · 128 avaliações</span>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            {hasPromo && (
              <p className="text-graphite-500 text-sm font-sans line-through">{formatCurrency(product.price)}</p>
            )}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-4xl font-bold text-gold-400">{formatCurrency(currentPrice)}</span>
              {hasPromo && <span className="badge bg-bordeaux-800 text-gold-300">-{discount}%</span>}
            </div>
            <p className="text-graphite-500 text-sm font-sans">
              ou {formatCurrency(currentPrice / 12)}/mês em 12x no cartão
            </p>
          </div>

          {/* Technical info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Volume', value: product.volume ? `${product.volume}ml` : null },
              { label: 'Teor Alcoólico', value: product.alcohol ? `${product.alcohol}%` : null },
              { label: 'Uva', value: product.grape },
            ].filter(i => i.value).map(item => (
              <div key={item.label} className="bg-graphite-900 border border-graphite-800 rounded-lg p-3 text-center">
                <p className="text-graphite-500 text-xs font-sans mb-1">{item.label}</p>
                <p className="text-off-white text-sm font-sans font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <p className="text-graphite-400 text-sm font-sans">Quantidade:</p>
            <div className="flex items-center border border-graphite-700 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-graphite-400 hover:text-off-white hover:bg-graphite-800 transition-colors">−</button>
              <span className="px-4 py-2 text-off-white font-sans font-medium min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 text-graphite-400 hover:text-off-white hover:bg-graphite-800 transition-colors">+</button>
            </div>
            {product.stock < 10 && (
              <p className="text-bordeaux-400 text-xs font-sans">Apenas {product.stock} unidades</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleAdd} className="btn-gold flex-1 py-4 text-base">
              <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
            </button>
            <button className="btn-outline py-4 px-4">
              <Heart className="w-5 h-5" />
            </button>
            <button className="btn-outline py-4 px-4">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-2 pt-2 border-t border-graphite-800">
            {['🚚 Frete calculado no checkout', '🔒 Pagamento 100% seguro via Stripe', '↩️ Troca garantida em 7 dias'].map(t => (
              <p key={t} className="text-graphite-500 text-xs font-sans">{t}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="mt-12 flex flex-col divide-y divide-graphite-800 border border-graphite-800 rounded-xl overflow-hidden">
        {sections.map(sec => (
          <div key={sec.id}>
            <button
              onClick={() => setExpanded(expanded === sec.id ? null : sec.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-graphite-900 transition-colors"
            >
              <span className="font-serif text-lg text-off-white">{sec.label}</span>
              {expanded === sec.id ? <ChevronUp className="w-4 h-4 text-gold-400" /> : <ChevronDown className="w-4 h-4 text-graphite-500" />}
            </button>
            {expanded === sec.id && (
              <div className="px-6 pb-6 pt-2 text-graphite-300 font-sans text-sm leading-relaxed">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
