'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Loader2, Upload } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase';
import { formatCurrency, slugify } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';

const EMPTY: Partial<Product> = {
  name: '', slug: '', description: '', category: 'tinto', country: '',
  region: '', grape: '', price: 0, promo_price: undefined, stock: 0,
  volume: 750, alcohol: undefined, vintage: undefined, featured: false, active: true,
};

export function AdminProductsClient({ products }: { products: Product[] }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Product>>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [localImages, setLocalImages] = useState<string[]>([]);
  const router = useRouter();
  const supabase = createBrowserClient();

  const openNew = () => { setEditing(EMPTY); setLocalImages([]); setModal(true); };
  const openEdit = (p: Product) => { setEditing(p); setLocalImages(p.images?.map(i => i.url) ?? []); setModal(true); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('products').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);
      setLocalImages(imgs => [...imgs, publicUrl]);
      toast.success('Imagem enviada');
    } catch {
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSave = async () => {
    if (!editing.name || !editing.price) return toast.error('Nome e preço são obrigatórios');
    setLoading(true);
    try {
      const payload = {
        ...editing,
        slug: editing.slug || slugify(editing.name!),
        promo_price: editing.promo_price || null,
        vintage: editing.vintage || null,
        alcohol: editing.alcohol || null,
        updated_at: new Date().toISOString(),
      };

      let productId = editing.id;

      if (editing.id) {
        const { error } = await supabase.from('products').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('products').insert(payload).select().single();
        if (error) throw error;
        productId = data.id;
      }

      // Save images
      if (productId && localImages.length) {
        await supabase.from('product_images').delete().eq('product_id', productId);
        await supabase.from('product_images').insert(
          localImages.map((url, i) => ({ product_id: productId, url, order: i }))
        );
      }

      toast.success(editing.id ? 'Produto atualizado' : 'Produto criado');
      setModal(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir "${name}"?`)) return;
    await supabase.from('products').delete().eq('id', id);
    toast.success('Produto excluído');
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-off-white">Produtos</h1>
          <p className="text-graphite-500 font-sans text-sm mt-1">{products.length} produtos cadastrados</p>
        </div>
        <button onClick={openNew} className="btn-gold gap-2">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {/* Table */}
      <div className="bg-graphite-900 border border-graphite-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-graphite-800">
                {['Produto', 'Categoria', 'Preço', 'Estoque', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-graphite-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-graphite-800/50 hover:bg-graphite-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-graphite-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {p.images?.[0]?.url
                          ? <Image src={p.images[0].url} alt={p.name} fill className="object-contain p-1" sizes="40px" />
                          : <div className="absolute inset-0 flex items-center justify-center text-lg">🍷</div>
                        }
                      </div>
                      <div>
                        <p className="text-off-white font-medium line-clamp-1">{p.name}</p>
                        {p.vintage && <p className="text-graphite-500 text-xs">{p.vintage}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-graphite-400 capitalize">{p.category}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gold-400 font-semibold">{formatCurrency(p.promo_price ?? p.price)}</p>
                      {p.promo_price && <p className="text-graphite-600 text-xs line-through">{formatCurrency(p.price)}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${p.stock > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {p.stock} un
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${p.active ? 'bg-green-900/30 text-green-400' : 'bg-graphite-800 text-graphite-500'}`}>
                      {p.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-graphite-500 hover:text-gold-400 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 text-graphite-500 hover:text-bordeaux-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/90">
          <div className="bg-graphite-900 border border-graphite-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-premium">
            <div className="flex items-center justify-between px-6 py-4 border-b border-graphite-800 sticky top-0 bg-graphite-900 z-10">
              <h2 className="font-serif text-xl text-off-white">{editing.id ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setModal(false)} className="text-graphite-500 hover:text-off-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Images */}
              <div>
                <p className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-2">Imagens</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {localImages.map((url, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-graphite-800 group">
                      <Image src={url} alt="" fill className="object-contain p-1" sizes="64px" />
                      <button
                        onClick={() => setLocalImages(imgs => imgs.filter((_, j) => j !== i))}
                        className="absolute inset-0 bg-graphite-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="w-16 h-16 rounded-lg border-2 border-dashed border-graphite-700 flex items-center justify-center cursor-pointer hover:border-gold-500/50 transition-colors">
                    {uploadingImg ? <Loader2 className="w-4 h-4 animate-spin text-graphite-500" /> : <Upload className="w-4 h-4 text-graphite-500" />}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Nome', key: 'name', col: 2 },
                  { label: 'Slug (auto)', key: 'slug', col: 2 },
                ].map(f => (
                  <div key={f.key} className={`col-span-${f.col}`}>
                    <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">{f.label}</label>
                    <input
                      type="text"
                      value={(editing as any)[f.key] ?? ''}
                      onChange={e => setEditing(p => ({ ...p, [f.key]: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                ))}

                {/* Category */}
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Categoria</label>
                  <select value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value as any }))} className="input-field">
                    {['tinto','branco','rose','espumante','kit'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">País</label>
                  <input type="text" value={editing.country ?? ''} onChange={e => setEditing(p => ({ ...p, country: e.target.value }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Preço (R$)</label>
                  <input type="number" step="0.01" value={editing.price ?? ''} onChange={e => setEditing(p => ({ ...p, price: parseFloat(e.target.value) }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Preço Promo (R$)</label>
                  <input type="number" step="0.01" value={editing.promo_price ?? ''} onChange={e => setEditing(p => ({ ...p, promo_price: e.target.value ? parseFloat(e.target.value) : undefined }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Estoque</label>
                  <input type="number" value={editing.stock ?? 0} onChange={e => setEditing(p => ({ ...p, stock: parseInt(e.target.value) }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Safra</label>
                  <input type="number" value={editing.vintage ?? ''} onChange={e => setEditing(p => ({ ...p, vintage: e.target.value ? parseInt(e.target.value) : undefined }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Volume (ml)</label>
                  <input type="number" value={editing.volume ?? 750} onChange={e => setEditing(p => ({ ...p, volume: parseInt(e.target.value) }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Teor Alcoólico (%)</label>
                  <input type="number" step="0.1" value={editing.alcohol ?? ''} onChange={e => setEditing(p => ({ ...p, alcohol: e.target.value ? parseFloat(e.target.value) : undefined }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Uva</label>
                  <input type="text" value={editing.grape ?? ''} onChange={e => setEditing(p => ({ ...p, grape: e.target.value }))} className="input-field" />
                </div>

                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Região</label>
                  <input type="text" value={editing.region ?? ''} onChange={e => setEditing(p => ({ ...p, region: e.target.value }))} className="input-field" />
                </div>
              </div>

              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Descrição</label>
                <textarea rows={3} value={editing.description ?? ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" />
              </div>

              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Notas de Degustação</label>
                <textarea rows={2} value={editing.tasting_notes ?? ''} onChange={e => setEditing(p => ({ ...p, tasting_notes: e.target.value }))} className="input-field resize-none" />
              </div>

              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Harmonização</label>
                <textarea rows={2} value={editing.pairing ?? ''} onChange={e => setEditing(p => ({ ...p, pairing: e.target.value }))} className="input-field resize-none" />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured ?? false} onChange={e => setEditing(p => ({ ...p, featured: e.target.checked }))} className="accent-gold-500 w-4 h-4" />
                  <span className="text-graphite-300 text-sm font-sans">Destaque</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.active ?? true} onChange={e => setEditing(p => ({ ...p, active: e.target.checked }))} className="accent-gold-500 w-4 h-4" />
                  <span className="text-graphite-300 text-sm font-sans">Ativo</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={loading} className="btn-gold flex-1 py-3">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar Produto'}
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
