import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-6 max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-green-900/30 border border-green-700/50 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-off-white mb-3">Pedido Confirmado!</h1>
            <div className="gold-divider" />
            <p className="text-graphite-400 font-sans leading-relaxed mt-4">
              Obrigado pela sua compra! Você receberá um e-mail de confirmação em breve com os detalhes do seu pedido e informações de rastreamento.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/account/orders" className="btn-gold flex-1 py-4">Ver Meus Pedidos</Link>
            <Link href="/catalog" className="btn-outline flex-1 py-4">Continuar Comprando</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
