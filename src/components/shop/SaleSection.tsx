import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';
import { WineCard } from './WineCard';
import type { Product } from '@/types';

export function SaleSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-16 bg-bordeaux-950/30">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bordeaux-800/40 border border-bordeaux-700/50 mb-3">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300 text-xs font-sans font-semibold uppercase tracking-wider">Tempo limitado</span>
            </div>
            <h2 className="section-title">Ofertas da Semana</h2>
            <div className="h-px w-12 bg-gradient-to-r from-bordeaux-500 to-transparent mt-3" />
          </div>
          <Link href="/catalog?sale=true" className="flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-sans transition-colors">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map(p => <WineCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
