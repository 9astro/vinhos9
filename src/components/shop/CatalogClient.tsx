'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { WineCard } from './WineCard';
import { cn, categoryLabels } from '@/lib/utils';
import type { Product } from '@/types';

const CATEGORIES = ['tinto', 'branco', 'rose', 'espumante', 'kit'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Destaque' },
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'price_asc', label: 'Menor Preço' },
  { value: 'price_desc', label: 'Maior Preço' },
];

interface Props {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  countries: string[];
  searchParams: Record<string, string | undefined>;
}

export function CatalogClient({ products, total, page, perPage, countries, searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.search ?? '');

  const updateParam = useCallback((key: string, value: string | null) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    p.delete('page');
    router.push(`${pathname}?${p.toString()}`);
  }, [params, pathname, router]);

  const totalPages = Math.ceil(total / perPage);
  const activeFiltersCount = ['category', 'country', 'min_price', 'max_price', 'sale'].filter(k => searchParams[k]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-off-white mb-1">
          {searchParams.category ? categoryLabels[searchParams.category] + 's' : 'Catálogo'}
        </h1>
        <p className="text-graphite-500 font-sans text-sm">{total} vinhos encontrados</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-500" />
          <input
            type="text"
            placeholder="Buscar vinhos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && updateParam('search', search || null)}
            className="input-field pl-10"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={searchParams.sort ?? 'featured'}
            onChange={e => updateParam('sort', e.target.value)}
            className="input-field pr-8 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-500 pointer-events-none" />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={cn('btn-outline gap-2 relative', activeFiltersCount > 0 && 'border-gold-500/50 text-gold-400')}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold-500 text-graphite-950 text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {filtersOpen && (
        <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6 mb-6 animate-slide-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <p className="text-gold-400 text-xs font-sans uppercase tracking-wider mb-3">Tipo</p>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={searchParams.category === cat}
                      onChange={() => updateParam('category', searchParams.category === cat ? null : cat)}
                      className="accent-gold-500"
                    />
                    <span className="text-sm font-sans text-graphite-300 group-hover:text-off-white transition-colors">
                      {categoryLabels[cat]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Country */}
            <div>
              <p className="text-gold-400 text-xs font-sans uppercase tracking-wider mb-3">País</p>
              <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
                {countries.map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="country"
                      checked={searchParams.country === c}
                      onChange={() => updateParam('country', searchParams.country === c ? null : c)}
                      className="accent-gold-500"
                    />
                    <span className="text-sm font-sans text-graphite-300 group-hover:text-off-white transition-colors">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <p className="text-gold-400 text-xs font-sans uppercase tracking-wider mb-3">Preço</p>
              <div className="flex flex-col gap-2">
                {[['Até R$100', null, '100'], ['R$100–R$200', '100', '200'], ['R$200–R$500', '200', '500'], ['Acima de R$500', '500', null]].map(([label, min, max]) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={searchParams.min_price === (min ?? undefined) && searchParams.max_price === (max ?? undefined)}
                      onChange={() => { updateParam('min_price', min); updateParam('max_price', max); }}
                      className="accent-gold-500"
                    />
                    <span className="text-sm font-sans text-graphite-300 group-hover:text-off-white transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special */}
            <div>
              <p className="text-gold-400 text-xs font-sans uppercase tracking-wider mb-3">Especial</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={searchParams.sale === 'true'} onChange={e => updateParam('sale', e.target.checked ? 'true' : null)} className="accent-gold-500" />
                  <span className="text-sm font-sans text-graphite-300">Em Oferta</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={searchParams.featured === 'true'} onChange={e => updateParam('featured', e.target.checked ? 'true' : null)} className="accent-gold-500" />
                  <span className="text-sm font-sans text-graphite-300">Destaque</span>
                </label>
              </div>
            </div>
          </div>

          {/* Clear filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => router.push(pathname)}
              className="mt-4 flex items-center gap-1 text-graphite-400 hover:text-off-white text-sm font-sans transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => updateParam('category', null)}
          className={cn('badge whitespace-nowrap px-3 py-1.5 cursor-pointer transition-all', !searchParams.category ? 'bg-bordeaux-800 text-off-white' : 'bg-graphite-800 text-graphite-400 hover:bg-graphite-700')}
        >
          Todos
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => updateParam('category', searchParams.category === cat ? null : cat)}
            className={cn('badge whitespace-nowrap px-3 py-1.5 cursor-pointer transition-all', searchParams.category === cat ? 'bg-bordeaux-800 text-off-white' : 'bg-graphite-800 text-graphite-400 hover:bg-graphite-700')}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map(p => <WineCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-5xl opacity-30">🍷</span>
          <p className="font-serif text-xl text-graphite-500">Nenhum vinho encontrado</p>
          <button onClick={() => router.push(pathname)} className="btn-outline text-sm">Limpar filtros</button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => updateParam('page', String(p))}
              className={cn('w-10 h-10 rounded-lg font-sans text-sm font-medium transition-all', p === page ? 'bg-bordeaux-800 text-off-white' : 'bg-graphite-900 text-graphite-400 hover:bg-graphite-800')}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
