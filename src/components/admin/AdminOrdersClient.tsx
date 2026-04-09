'use client';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { createBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

const STATUSES = ['pending','paid','processing','shipped','delivered','cancelled'];
const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Aguardando',  color: 'text-yellow-400 bg-yellow-400/10' },
  paid:       { label: 'Pago',        color: 'text-blue-400 bg-blue-400/10' },
  processing: { label: 'Preparando', color: 'text-purple-400 bg-purple-400/10' },
  shipped:    { label: 'Enviado',     color: 'text-cyan-400 bg-cyan-400/10' },
  delivered:  { label: 'Entregue',   color: 'text-green-400 bg-green-400/10' },
  cancelled:  { label: 'Cancelado',  color: 'text-red-400 bg-red-400/10' },
};

export function AdminOrdersClient({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState('all');
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const router = useRouter();
  const supabase = createBrowserClient();

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    toast.success('Status atualizado');
    router.refresh();
  };

  const saveTracking = async (id: string) => {
    const code = tracking[id];
    if (!code) return;
    await supabase.from('orders').update({ tracking_code: code, status: 'shipped' }).eq('id', id);
    toast.success('Rastreio salvo');
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-off-white">Pedidos</h1>
        <p className="text-graphite-500 font-sans text-sm mt-1">{orders.length} pedidos no total</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {['all', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`badge px-3 py-1.5 cursor-pointer transition-all text-xs ${filter === s ? 'bg-bordeaux-800 text-off-white' : 'bg-graphite-800 text-graphite-400 hover:bg-graphite-700'}`}
          >
            {s === 'all' ? 'Todos' : STATUS_LABEL[s]?.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((order: any) => {
          const st = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
          return (
            <div key={order.id} className="bg-graphite-900 border border-graphite-800 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-graphite-500 text-xs font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-graphite-400 text-xs font-sans">{new Date(order.created_at).toLocaleString('pt-BR')}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {order.items?.map((item: any, i: number) => (
                      <span key={i} className="text-graphite-400 text-xs font-sans">
                        {item.quantity}x {item.product?.name}{i < order.items.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="font-serif text-lg text-gold-400 font-bold">{formatCurrency(Number(order.total))}</span>

                  {/* Status dropdown */}
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className={`badge ${st.color} cursor-pointer appearance-none pr-6 pl-3 py-1.5 border-0 outline-none text-xs`}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]?.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Tracking */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder={order.tracking_code ?? 'Código de rastreio...'}
                  value={tracking[order.id] ?? ''}
                  onChange={e => setTracking(t => ({ ...t, [order.id]: e.target.value }))}
                  className="input-field flex-1 py-2 text-xs"
                />
                <button onClick={() => saveTracking(order.id)} className="btn-outline py-2 px-4 text-xs">Salvar</button>
              </div>
            </div>
          );
        })}

        {!filtered.length && (
          <div className="text-center py-16 text-graphite-600 font-sans">Nenhum pedido encontrado</div>
        )}
      </div>
    </div>
  );
}
