'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wine, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error('Senha deve ter ao menos 8 caracteres');
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Conta criada! Verifique seu e-mail.');
      router.push('/account/orders');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-bordeaux relative">
      <div className="wine-noise absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-bordeaux-800 border border-bordeaux-600 flex items-center justify-center">
            <Wine className="w-6 h-6 text-gold-400" />
          </div>
          <span className="font-serif text-2xl font-bold text-off-white">Vinheria <span className="text-gradient-gold">Premium</span></span>
        </Link>

        <div className="bg-graphite-900/90 border border-graphite-800 rounded-2xl p-8 shadow-premium">
          <h1 className="font-serif text-2xl font-bold text-off-white mb-1 text-center">Criar Conta</h1>
          <p className="text-graphite-500 text-sm font-sans text-center mb-6">Junte-se à nossa comunidade</p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {[
              { label: 'Nome Completo', value: name, set: setName, type: 'text', placeholder: 'João Silva' },
              { label: 'E-mail', value: email, set: setEmail, type: 'email', placeholder: 'seu@email.com' },
              { label: 'Senha', value: password, set: setPassword, type: 'password', placeholder: 'Mínimo 8 caracteres' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} required placeholder={f.placeholder} className="input-field" />
              </div>
            ))}

            <button type="submit" disabled={loading} className="btn-gold w-full py-4 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Criar Conta'}
            </button>
          </form>

          <p className="text-center text-graphite-500 text-sm font-sans mt-6">
            Já tem conta?{' '}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
