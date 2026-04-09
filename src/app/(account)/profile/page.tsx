'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { createBrowserClient } from '@/lib/supabase';
import { Loader2, Plus, MapPin, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Address } from '@/types';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addingAddr, setAddingAddr] = useState(false);
  const [newAddr, setNewAddr] = useState<Partial<Address>>({});
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login?next=/account/profile'); return; }
      setUser(user);
      setName(user.user_metadata?.full_name ?? '');
    });
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const { data } = await supabase.from('addresses').select('*').order('is_default', { ascending: false });
    setAddresses(data ?? []);
  };

  const updateName = async () => {
    setLoading(true);
    await supabase.auth.updateUser({ data: { full_name: name } });
    toast.success('Nome atualizado');
    setLoading(false);
  };

  const saveAddress = async () => {
    if (!newAddr.street || !newAddr.city || !newAddr.zip) return toast.error('Preencha os campos obrigatórios');
    await supabase.from('addresses').insert({ ...newAddr, user_id: user.id });
    toast.success('Endereço salvo');
    setAddingAddr(false);
    setNewAddr({});
    loadAddresses();
  };

  const deleteAddress = async (id: string) => {
    await supabase.from('addresses').delete().eq('id', id);
    loadAddresses();
  };

  const setDefault = async (id: string) => {
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user?.id);
    await supabase.from('addresses').update({ is_default: true }).eq('id', id);
    loadAddresses();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
          <h1 className="font-serif text-3xl font-bold text-off-white">Meu Perfil</h1>

          {/* Personal data */}
          <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-serif text-lg text-off-white">Dados Pessoais</h2>
            <div>
              <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">Nome</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">E-mail</label>
              <input type="email" value={user?.email ?? ''} disabled className="input-field opacity-50 cursor-not-allowed" />
            </div>
            <button onClick={updateName} disabled={loading} className="btn-gold w-fit py-2.5 px-6 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar'}
            </button>
          </div>

          {/* Addresses */}
          <div className="bg-graphite-900 border border-graphite-800 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg text-off-white">Endereços</h2>
              <button onClick={() => setAddingAddr(!addingAddr)} className="btn-outline text-sm py-2 gap-1">
                <Plus className="w-4 h-4" /> Novo
              </button>
            </div>

            {addingAddr && (
              <div className="border border-graphite-700 rounded-xl p-4 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Apelido', key: 'name', col: 2 },
                    { label: 'Rua', key: 'street', col: 2 },
                    { label: 'Número', key: 'number', col: 1 },
                    { label: 'Complemento', key: 'complement', col: 1 },
                    { label: 'Bairro', key: 'neighborhood', col: 2 },
                    { label: 'Cidade', key: 'city', col: 1 },
                    { label: 'Estado', key: 'state', col: 1 },
                    { label: 'CEP', key: 'zip', col: 1 },
                  ].map(f => (
                    <div key={f.key} className={`col-span-${f.col}`}>
                      <label className="text-graphite-500 text-xs font-sans mb-1 block">{f.label}</label>
                      <input
                        type="text"
                        value={(newAddr as any)[f.key] ?? ''}
                        onChange={e => setNewAddr(a => ({ ...a, [f.key]: e.target.value }))}
                        className="input-field py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveAddress} className="btn-gold text-sm py-2 px-4">Salvar Endereço</button>
                  <button onClick={() => setAddingAddr(false)} className="btn-outline text-sm py-2 px-4">Cancelar</button>
                </div>
              </div>
            )}

            {addresses.map(addr => (
              <div key={addr.id} className="flex items-start gap-3 p-4 border border-graphite-800 rounded-xl">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-off-white text-sm font-sans font-medium">{addr.name || addr.street}</p>
                  <p className="text-graphite-400 text-xs font-sans mt-0.5">
                    {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}
                  </p>
                  <p className="text-graphite-400 text-xs font-sans">{addr.city} - {addr.state}, {addr.zip}</p>
                  {addr.is_default && <span className="badge bg-gold-500/10 text-gold-400 mt-1">Principal</span>}
                </div>
                <div className="flex flex-col gap-1">
                  {!addr.is_default && (
                    <button onClick={() => setDefault(addr.id)} className="text-graphite-500 hover:text-gold-400 text-xs font-sans transition-colors">Definir padrão</button>
                  )}
                  <button onClick={() => deleteAddress(addr.id)} className="text-graphite-600 hover:text-bordeaux-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {!addresses.length && !addingAddr && (
              <p className="text-graphite-600 text-sm font-sans text-center py-4">Nenhum endereço cadastrado</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
