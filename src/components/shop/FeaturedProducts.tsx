import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { WineCard } from './WineCard';
import type { Product } from '@/types';

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-gold-400 text-xs font-sans uppercase tracking-widest mb-2">Curadoria</p>
          <h2 className="section-title">Vinhos em Destaque</h2>
          <div className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent mt-3" />
        </div>
        <Link href="/catalog?featured=true" className="flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-sans transition-colors">
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <WineCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
