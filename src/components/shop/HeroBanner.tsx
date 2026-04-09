'use client';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'A arte do vinho,\ncurada para você',
    subtitle: 'Mais de 300 rótulos selecionados dos melhores produtores do mundo',
    cta: 'Explorar Catálogo',
    href: '/catalog',
    badge: '🏆 Melhor Curadoria 2024',
    bg: 'from-bordeaux-950 via-bordeaux-900 to-graphite-950',
  },
  {
    title: 'Ofertas imperdíveis\nesta semana',
    subtitle: 'Descontos exclusivos em rótulos premiados por tempo limitado',
    cta: 'Ver Ofertas',
    href: '/catalog?sale=true',
    badge: '🔥 Desconto de até 40%',
    bg: 'from-graphite-950 via-bordeaux-950/60 to-graphite-950',
  },
  {
    title: 'Espumantes para\ncelebrar momentos',
    subtitle: 'Do Prosecco ao Champagne, encontre o brinde perfeito',
    cta: 'Ver Espumantes',
    href: '/catalog?category=espumante',
    badge: '✨ Coleção Premium',
    bg: 'from-graphite-950 via-graphite-900 to-bordeaux-950',
  },
];

export function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <section className={`relative min-h-[90dvh] flex items-center bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}>
      {/* Background texture */}
      <div className="absolute inset-0 wine-noise opacity-60" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bordeaux-800/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6 animate-fade-in">
            <span className="text-sm font-sans text-gold-300">{slide.badge}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-off-white leading-tight mb-4 animate-slide-up whitespace-pre-line">
            {slide.title.split('\n')[0]}
            <br />
            <span className="text-gradient-gold">{slide.title.split('\n')[1]}</span>
          </h1>

          {/* Divider */}
          <div className="h-px w-16 bg-gradient-to-r from-gold-500 to-transparent mb-6" />

          {/* Subtitle */}
          <p className="font-sans text-graphite-300 text-lg leading-relaxed mb-8 animate-fade-in">
            {slide.subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={slide.href} className="btn-gold text-base px-8 py-4">
              {slide.cta} <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/catalog" className="btn-outline text-base px-8 py-4">
              Ver Todos os Vinhos
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-graphite-500 text-xs font-sans">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gold-500" />
              <span>+5.000 clientes satisfeitos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-500">🚚</span>
              <span>Frete para todo Brasil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-500">🔒</span>
              <span>Compra 100% segura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-gold-400' : 'w-2 bg-graphite-600'}`}
          />
        ))}
      </div>
    </section>
  );
}
