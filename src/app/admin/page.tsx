import { createServerClient } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, Wine, TrendingUp, Users } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = createServerClient();

  const [
    { count: totalProducts },
    { count: totalOrders },
    { count: pendingOrders },
    { data: revenue },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('total').in('status', ['paid', 'processing', 'shipped', 'delivered']),
  ]);

  const totalRevenue = revenue?.reduce((sum, o) => sum + Number(o.total), 0) ?? 0;

  const cards = [
    { label: 'Receita Total',     value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-gold-400',     bg: 'bg-gold-500/10' },
    { label: 'Pedidos',           value: totalOrders ?? 0,             icon: ShoppingBag, color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'Aguard. Pagamento', value: pendingOrders ?? 0,           icon: ShoppingBag, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Produtos Ativos',   value: totalProducts ?? 0,           icon: Wine,        color: 'text-green-400',  bg: 'bg-green-500/10' },
  ];

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, status, total, created_at')
    .order('created_at', { ascending: false })
    .limit(8);

  const STATUS: Record<string, string> = {
    pending: 'Aguardando', paid: 'Pago', processing: 'Preparando',
    shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado',
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-off-white">Dashboard</h1>
        <p className="text-graphite-500 font-sans text-sm mt-1">Visão geral da loja</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-graphite-900 border border-graphite-800 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="text-graphite-500 text-xs font-sans">{c.label}</p>
            <p className="font-serif text-2xl font-bold text-off-white mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-graphite-900 border border-graphite-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-graphite-800">
          <h2 className="font-serif text-lg text-off-white">Pedidos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-graphite-800">
                {['Pedido', 'Status', 'Total', 'Data'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-graphite-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map(o => (
                <tr key={o.id} className="border-b border-graphite-800/50 hover:bg-graphite-800/30 transition-colors">
                  <td className="px-6 py-4 text-graphite-300 font-mono text-xs">#{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <span className="badge bg-graphite-800 text-graphite-300">{STATUS[o.status] ?? o.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gold-400 font-semibold">{formatCurrency(Number(o.total))}</td>
                  <td className="px-6 py-4 text-graphite-500 text-xs">
                    {new Date(o.created_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
