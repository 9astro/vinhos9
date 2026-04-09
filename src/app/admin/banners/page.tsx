'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { createBrowserClient } from '@/lib/supabase';
import toast from 'react-hot-toast';
import type { Banner } from '@/types';

const EMPTY: Partial<Banner> = { title: '', subtitle: '', image_url: '', cta_text: '', cta_url: '', active: true, order: 0 };

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Banner>>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const supabase = createBrowserClient();

  const load = async () => {
    const { data } = await supabase.from('banners').select('*').order('order');
    setBanners(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `banner-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('banners').upload(path, file, { upsert: true });
    if (error) { toast.error('Erro ao enviar'); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('banners').getPublicUrl(path);
    setEditing(b => ({ ...b, image_url: publicUrl }));
    setUploading(false);
    toast.success('Imagem enviada');
  };

  const handleSave = async () => {
    if (!editing.title || !editing.image_url) return toast.error('Título e imagem obrigatórios');
    setLoading(true);
    if (editing.id) {
      await supabase.from('banners').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('banners').insert(editing);
    }
    toast.success('Banner salvo');
    setModal(false);
    setLoading(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir banner?')) return;
    await supabase.from('banners').delete().eq('id', id);
    toast.success('Excluído');
    load();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-off-white">Banners</h1>
        <button onClick={() => { setEditing(EMPTY); setModal(true); }} className="btn-gold gap-2">
          <Plus className="w-4 h-4" /> Novo Banner
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {banners.map(b => (
          <div key={b.id} className="bg-graphite-900 border border-graphite-800 rounded-xl overflow-hidden">
            {b.image_url && (
              <div className="relative h-32">
                <Image src={b.image_url} alt={b.title} fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="font-serif text-sm font-bold text-off-white">{b.title}</p>
                </div>
              </div>
            )}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`badge ${b.active ? 'bg-green-900/30 text-green-400' : 'bg-graphite-800 text-graphite-500'}`}>
                  {b.active ? 'Ativo' : 'Inativo'}
                </span>
                <span className="text-graphite-500 text-xs font-sans">Ordem: {b.order}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(b); setModal(true); }} className="p-1.5 text-graphite-500 hover:text-gold-400 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(b.id)} className="p-1.5 text-graphite-500 hover:text-bordeaux-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/90">
          <div className="bg-graphite-900 border border-graphite-800 rounded-2xl w-full max-w-lg shadow-premium">
            <div className="flex items-center justify-between px-6 py-4 border-b border-graphite-800">
              <h2 className="font-serif text-xl text-off-white">{editing.id ? 'Editar Banner' : 'Novo Banner'}</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-graphite-500" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {/* Image upload */}
              <div>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-2 block">Imagem</label>
                {editing.image_url && (
                  <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                    <Image src={editing.image_url} alt="" fill className="object-cover" sizes="400px" />
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-graphite-700 rounded-lg cursor-pointer hover:border-gold-500/50 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin text-graphite-500" /> : <Upload className="w-4 h-4 text-graphite-500" />}
                  <span className="text-graphite-400 text-sm font-sans">{uploading ? 'Enviando...' : 'Escolher imagem'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              </div>

              {[
                { label: 'Título', key: 'title' },
                { label: 'Subtítulo', key: 'subtitle' },
                { label: 'Texto do botão', key: 'cta_text' },
                { label: 'Link do botão', key: 'cta_url' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">{f.label}</label>
                  <input type="text" value={(editing as any)[f.key] ?? ''} onChange={e => setEditing(b => ({ ...b, [f.key]: e.target.value }))} className="input-field" />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Ordem</label>
                  <input type="number" value={editing.order ?? 0} onChange={e => setEditing(b => ({ ...b, order: parseInt(e.target.value) }))} className="input-field" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.active ?? true} onChange={e => setEditing(b => ({ ...b, active: e.target.checked }))} className="accent-gold-500 w-4 h-4" />
                    <span className="text-graphite-300 text-sm font-sans">Ativo</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={loading} className="btn-gold flex-1 py-3">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar'}
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
