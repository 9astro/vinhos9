import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WineCard } from '@/components/shop/WineCard';
import { createServerClient } from '@/lib/supabase';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default async function FavoritesPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/account/favorites');

  const { data: favorites } = await supabase
    .from('favorites')
    .select('product:products(*, images:product_images(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const products = favorites?.map(f => f.product).filter(Boolean) ?? [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="font-serif text-3xl font-bold text-off-white mb-8">Meus Favoritos</h1>

          {!products.length ? (
            <div className="flex flex-col items-center gap-6 py-24">
              <Heart className="w-12 h-12 text-graphite-700" />
              <p className="font-serif text-xl text-graphite-500">Nenhum favorito ainda</p>
              <Link href="/catalog" className="btn-gold">Explorar Catálogo</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p: any) => <WineCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
