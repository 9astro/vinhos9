'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { Coupon } from '@/types';

const EMPTY: Partial<Coupon> = { code: '', type: 'percentage', value: 10, min_order: null, max_uses: null, active: true };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Coupon>>(EMPTY);
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient();

  const load = async () => {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    setCoupons(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing.code || !editing.value) return toast.error('Código e valor obrigatórios');
    setLoading(true);
    if (editing.id) {
      await supabase.from('coupons').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('coupons').insert({ ...editing, uses: 0 });
    }
    toast.success('Cupom salvo');
    setModal(false);
    setLoading(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir cupom?')) return;
    await supabase.from('coupons').delete().eq('id', id);
    toast.success('Cupom excluído');
    load();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('coupons').update({ active: !active }).eq('id', id);
    load();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-off-white">Cupons</h1>
        <button onClick={() => { setEditing(EMPTY); setModal(true); }} className="btn-gold gap-2">
          <Plus className="w-4 h-4" /> Novo Cupom
        </button>
      </div>

      <div className="bg-graphite-900 border border-graphite-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-graphite-800">
              {['Código', 'Tipo', 'Valor', 'Mín. Pedido', 'Usos', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-graphite-500 text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} className="border-b border-graphite-800/50 hover:bg-graphite-800/30 transition-colors">
                <td className="px-4 py-3 font-mono text-gold-300 font-bold text-xs tracking-widest">{c.code}</td>
                <td className="px-4 py-3 text-graphite-400 capitalize">{c.type === 'percentage' ? 'Porcentagem' : 'Fixo'}</td>
                <td className="px-4 py-3 text-off-white font-semibold">
                  {c.type === 'percentage' ? `${c.value}%` : formatCurrency(c.value)}
                </td>
                <td className="px-4 py-3 text-graphite-400">{c.min_order ? formatCurrency(c.min_order) : '—'}</td>
                <td className="px-4 py-3 text-graphite-400">{c.uses}{c.max_uses ? `/${c.max_uses}` : ''}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(c.id, c.active)} className={`badge cursor-pointer ${c.active ? 'bg-green-900/30 text-green-400' : 'bg-graphite-800 text-graphite-500'}`}>
                    {c.active ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-graphite-500 hover:text-bordeaux-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!coupons.length && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-graphite-600">Nenhum cupom cadastrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/90">
          <div className="bg-graphite-900 border border-graphite-800 rounded-2xl w-full max-w-md shadow-premium">
            <div className="flex items-center justify-between px-6 py-4 border-b border-graphite-800">
              <h2 className="font-serif text-xl text-off-white">Novo Cupom</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-graphite-500" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Código</label>
                <input type="text" value={editing.code ?? ''} onChange={e => setEditing(c => ({ ...c, code: e.target.value.toUpperCase() }))} className="input-field uppercase tracking-widest" placeholder="BEMVINDO10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Tipo</label>
                  <select value={editing.type} onChange={e => setEditing(c => ({ ...c, type: e.target.value as any }))} className="input-field">
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">
                    Valor {editing.type === 'percentage' ? '(%)' : '(R$)'}
                  </label>
                  <input type="number" step="0.01" value={editing.value ?? ''} onChange={e => setEditing(c => ({ ...c, value: parseFloat(e.target.value) }))} className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Pedido Mínimo (R$)</label>
                  <input type="number" value={editing.min_order ?? ''} onChange={e => setEditing(c => ({ ...c, min_order: e.target.value ? parseFloat(e.target.value) : null }))} className="input-field" placeholder="Sem mínimo" />
                </div>
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Máx. de Usos</label>
                  <input type="number" value={editing.max_uses ?? ''} onChange={e => setEditing(c => ({ ...c, max_uses: e.target.value ? parseInt(e.target.value) : null }))} className="input-field" placeholder="Ilimitado" />
                </div>
              </div>

              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Validade (opcional)</label>
                <input type="datetime-local" value={editing.expires_at ?? ''} onChange={e => setEditing(c => ({ ...c, expires_at: e.target.value || null }))} className="input-field" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.active ?? true} onChange={e => setEditing(c => ({ ...c, active: e.target.checked }))} className="accent-gold-500 w-4 h-4" />
                <span className="text-graphite-300 text-sm font-sans">Ativo</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={loading} className="btn-gold flex-1 py-3">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar Cupom'}
                </button>
                <button onClick={() => setModal(false)} className="btn-outline py-3 px-6">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
