'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { cn, formatCurrency, getDiscountPercentage, categoryLabels } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import type { Product } from '@/types';

interface WineCardProps {
  product: Product;
  className?: string;
}

export function WineCard({ product, className }: WineCardProps) {
  const addItem = useCart(s => s.addItem);
  const mainImage = product.images?.[0]?.url;
  const hasPromo = !!product.promo_price;
  const discount = hasPromo ? getDiscountPercentage(product.price, product.promo_price!) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  return (
    <Link href={`/product/${product.slug}`} className={cn('card-wine group flex flex-col', className)}>
      {/* Image area */}
      <div className="relative aspect-[3/4] bg-graphite-800 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🍷</div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasPromo && (
            <span className="badge bg-bordeaux-800 text-gold-300">-{discount}%</span>
          )}
          {product.featured && (
            <span className="badge bg-gold-500/20 text-gold-400 border border-gold-500/30">Destaque</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-graphite-900/80 flex items-center justify-center text-graphite-400 hover:text-bordeaux-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Favoritar"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-2 left-2">
          <span className="badge bg-graphite-950/70 text-graphite-400">
            {categoryLabels[product.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {product.country && (
          <p className="text-graphite-500 text-xs font-sans uppercase tracking-wider">
            {product.country}{product.region ? ` · ${product.region}` : ''}
          </p>
        )}
        <h3 className="font-serif text-off-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-gold-300 transition-colors">
          {product.name}
        </h3>

        {product.vintage && (
          <p className="text-graphite-500 text-xs font-sans">{product.vintage}</p>
        )}

        {/* Price */}
        <div className="mt-auto pt-2">
          {hasPromo ? (
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-bold text-gold-400">{formatCurrency(product.promo_price!)}</span>
              <span className="text-graphite-600 text-xs line-through font-sans">{formatCurrency(product.price)}</span>
            </div>
          ) : (
            <span className="font-serif text-lg font-bold text-off-white">{formatCurrency(product.price)}</span>
          )}
          <p className="text-graphite-500 text-xs font-sans mt-0.5">em até 12x no cartão</p>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="mt-2 btn-primary w-full py-2.5 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
        >
          <ShoppingCart className="w-4 h-4" /> Adicionar
        </button>
      </div>
    </Link>
  );
}
