'use client';
import { useAgeVerification } from '@/hooks/useAgeVerification';
import { Wine } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AgeGate() {
  const { verified, verify, deny } = useAgeVerification();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || verified) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-graphite-950/98 backdrop-blur-xl">
      <div className="wine-noise absolute inset-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 max-w-sm w-full text-center animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-bordeaux-900 border border-bordeaux-700 flex items-center justify-center">
            <Wine className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-off-white">Vinheria Premium</h1>
          <div className="gold-divider w-20" />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-3">
          <p className="font-serif text-xl text-gold-400 font-semibold">Você tem 18 anos ou mais?</p>
          <p className="text-graphite-400 text-sm leading-relaxed font-sans">
            A venda e consumo de bebidas alcoólicas é proibida para menores de 18 anos, conforme a Lei nº 8.069/90 e o Estatuto da Criança e do Adolescente.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button onClick={verify} className="btn-gold w-full text-base py-4">
            Sim, tenho 18 anos ou mais
          </button>
          <button onClick={deny} className="btn-outline w-full text-sm">
            Não, sou menor de idade
          </button>
        </div>

        <p className="text-graphite-600 text-xs font-sans">
          🔒 Este site é protegido por verificação de idade
        </p>
      </div>
    </div>
  );
}
