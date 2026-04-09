import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { createServerClient } from '@/lib/supabase';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Aguardando Pagamento', color: 'text-yellow-400 bg-yellow-400/10' },
  paid:       { label: 'Pago',                 color: 'text-blue-400 bg-blue-400/10' },
  processing: { label: 'Em Preparação',        color: 'text-purple-400 bg-purple-400/10' },
  shipped:    { label: 'Enviado',              color: 'text-cyan-400 bg-cyan-400/10' },
  delivered:  { label: 'Entregue',             color: 'text-green-400 bg-green-400/10' },
  cancelled:  { label: 'Cancelado',            color: 'text-red-400 bg-red-400/10' },
};

export default async function OrdersPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/account/orders');

  const { data: orders } = await supabase
    .from('orders')
    .select('*, items:order_items(*, product:products(name, images:product_images(*)))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-serif text-3xl font-bold text-off-white mb-8">Meus Pedidos</h1>

          {!orders?.length ? (
            <div className="flex flex-col items-center gap-6 py-20">
              <Package className="w-12 h-12 text-graphite-700" />
              <p className="font-serif text-xl text-graphite-500">Nenhum pedido ainda</p>
              <Link href="/catalog" className="btn-gold">Explorar Catálogo</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order: any) => {
                const st = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
                return (
                  <div key={order.id} className="bg-graphite-900 border border-graphite-800 rounded-xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-graphite-500 text-xs font-sans mb-1">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-graphite-400 text-sm font-sans">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`badge ${st.color} px-3 py-1`}>{st.label}</span>
                        <span className="font-serif text-lg text-gold-400 font-bold">{formatCurrency(order.total)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {order.items?.slice(0, 4).map((item: any) => (
                        <div key={item.id} className="flex-shrink-0 text-xs text-graphite-400 font-sans">
                          <div className="w-12 h-12 bg-graphite-800 rounded-lg mb-1 flex items-center justify-center text-lg">
                            {item.product?.images?.[0]?.url ? '🍷' : '🍷'}
                          </div>
                          {item.quantity}x
                        </div>
                      ))}
                    </div>

                    {order.tracking_code && (
                      <p className="text-graphite-500 text-xs font-sans mt-3">
                        Rastreio: <span className="text-gold-400 font-mono">{order.tracking_code}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
