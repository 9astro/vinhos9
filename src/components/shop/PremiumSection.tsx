import Link from 'next/link';
import { ChevronRight, Crown } from 'lucide-react';
import { WineCard } from './WineCard';
import type { Product } from '@/types';

export function PremiumSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-br from-graphite-900 to-graphite-950 border border-gold-500/10 p-8 sm:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-bordeaux-800/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-xs font-sans uppercase tracking-widest">Seleção Exclusiva</span>
              </div>
              <h2 className="section-title text-gradient-gold">Vinhos Premium</h2>
              <div className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent mt-3" />
            </div>
            <Link href="/catalog?min_price=200" className="flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-sans transition-colors">
              Ver coleção <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(p => <WineCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
