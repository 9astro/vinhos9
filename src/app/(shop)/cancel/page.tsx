import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-6 max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-bordeaux-900/30 border border-bordeaux-700/50 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-bordeaux-400" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-off-white mb-3">Pagamento Cancelado</h1>
            <div className="gold-divider" />
            <p className="text-graphite-400 font-sans leading-relaxed mt-4">
              Seu pagamento foi cancelado. Não se preocupe — seus itens continuam no carrinho.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/cart" className="btn-gold flex-1 py-4">Voltar ao Carrinho</Link>
            <Link href="/catalog" className="btn-outline flex-1 py-4">Ver Catálogo</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
