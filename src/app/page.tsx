import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/shop/HeroBanner';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { FeaturedProducts } from '@/components/shop/FeaturedProducts';
import { SaleSection } from '@/components/shop/SaleSection';
import { PremiumSection } from '@/components/shop/PremiumSection';
import { createServerClient } from '@/lib/supabase';

export default async function HomePage() {
  const supabase = createServerClient();

  const [{ data: featured }, { data: sale }, { data: premium }] = await Promise.all([
    supabase
      .from('products')
      .select('*, images:product_images(*)')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('products')
      .select('*, images:product_images(*)')
      .eq('active', true)
      .not('promo_price', 'is', null)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('products')
      .select('*, images:product_images(*)')
      .eq('active', true)
      .gte('price', 200)
      .order('price', { ascending: false })
      .limit(4),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts products={featured ?? []} />
        <SaleSection products={sale ?? []} />
        <PremiumSection products={premium ?? []} />
      </main>
      <Footer />
    </>
  );
}
