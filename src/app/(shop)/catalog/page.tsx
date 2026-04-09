import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CatalogClient } from '@/components/shop/CatalogClient';
import { createServerClient } from '@/lib/supabase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Vinhos',
  description: 'Explore nossa seleção completa de vinhos tintos, brancos, rosés, espumantes e kits.',
};

interface SearchParams {
  category?: string;
  country?: string;
  min_price?: string;
  max_price?: string;
  sort?: string;
  search?: string;
  sale?: string;
  featured?: string;
  page?: string;
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createServerClient();
  const page = Number(searchParams.page ?? 1);
  const perPage = 24;
  const from = (page - 1) * perPage;

  let query = supabase
    .from('products')
    .select('*, images:product_images(*)', { count: 'exact' })
    .eq('active', true);

  if (searchParams.category) query = query.eq('category', searchParams.category);
  if (searchParams.country) query = query.eq('country', searchParams.country);
  if (searchParams.min_price) query = query.gte('price', Number(searchParams.min_price));
  if (searchParams.max_price) query = query.lte('price', Number(searchParams.max_price));
  if (searchParams.sale === 'true') query = query.not('promo_price', 'is', null);
  if (searchParams.featured === 'true') query = query.eq('featured', true);
  if (searchParams.search) query = query.ilike('name', `%${searchParams.search}%`);

  const sort = searchParams.sort ?? 'featured';
  if (sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (sort === 'price_desc') query = query.order('price', { ascending: false });
  else if (sort === 'newest') query = query.order('created_at', { ascending: false });
  else query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });

  query = query.range(from, from + perPage - 1);

  const { data: products, count } = await query;

  // Fetch countries for filter
  const { data: countries } = await supabase
    .from('products')
    .select('country')
    .eq('active', true)
    .not('country', 'is', null);

  const uniqueCountries = [...new Set(countries?.map(c => c.country).filter(Boolean))];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <CatalogClient
          products={products ?? []}
          total={count ?? 0}
          page={page}
          perPage={perPage}
          countries={uniqueCountries}
          searchParams={searchParams}
        />
      </main>
      <Footer />
    </>
  );
}
