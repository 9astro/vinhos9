'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Wine, Loader2, Eye, EyeOff } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/account/orders';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error('E-mail ou senha incorretos');
    } else {
      toast.success('Bem-vindo de volta!');
      router.push(next);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-bordeaux relative">
      <div className="wine-noise absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-bordeaux-800 border border-bordeaux-600 flex items-center justify-center">
            <Wine className="w-6 h-6 text-gold-400" />
          </div>
          <span className="font-serif text-2xl font-bold text-off-white">Vinheria <span className="text-gradient-gold">Premium</span></span>
        </Link>

        <div className="bg-graphite-900/90 border border-graphite-800 rounded-2xl p-8 shadow-premium">
          <h1 className="font-serif text-2xl font-bold text-off-white mb-1 text-center">Entrar</h1>
          <p className="text-graphite-500 text-sm font-sans text-center mb-6">Acesse sua conta</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider mb-1.5 block">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-graphite-400 text-xs font-sans uppercase tracking-wider">Senha</label>
                <Link href="/forgot-password" className="text-gold-400 text-xs font-sans hover:text-gold-300">Esqueci a senha</Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input-field pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-500 hover:text-graphite-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full py-4 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-graphite-500 text-sm font-sans mt-6">
            Não tem conta?{' '}
            <Link href="/register" className="text-gold-400 hover:text-gold-300 font-medium">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
