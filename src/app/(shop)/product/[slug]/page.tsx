import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductClient } from '@/components/shop/ProductClient';
import { WineCard } from '@/components/shop/WineCard';
import { createServerClient } from '@/lib/supabase';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerClient();
  const { data } = await supabase.from('products').select('name, description').eq('slug', params.slug).single();
  if (!data) return { title: 'Produto não encontrado' };
  return { title: data.name, description: data.description?.slice(0, 160) };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient();
  const { data: product } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('slug', params.slug)
    .eq('active', true)
    .single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('category', product.category)
    .eq('active', true)
    .neq('id', product.id)
    .limit(4);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <ProductClient product={product} />

        {related && related.length > 0 && (
          <section className="py-16 px-4 max-w-7xl mx-auto">
            <h2 className="section-title mb-8">Você também pode gostar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <WineCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
