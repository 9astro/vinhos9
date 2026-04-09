import Link from 'next/link';

const categories = [
  { slug: 'tinto',     label: 'Tintos',     emoji: '🍷', desc: 'Clássicos & Modernos',  color: 'from-bordeaux-900/80 to-bordeaux-950' },
  { slug: 'branco',    label: 'Brancos',    emoji: '🥂', desc: 'Frescos & Elegantes',    color: 'from-graphite-700/80 to-graphite-900' },
  { slug: 'rose',      label: 'Rosés',      emoji: '🌸', desc: 'Delicados & Aromáticos', color: 'from-bordeaux-700/40 to-graphite-900' },
  { slug: 'espumante', label: 'Espumantes', emoji: '✨', desc: 'Para Celebrar',           color: 'from-gold-700/30 to-graphite-900' },
  { slug: 'kit',       label: 'Kits',       emoji: '🎁', desc: 'Presentes Especiais',    color: 'from-graphite-800/80 to-graphite-950' },
];

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-gold-400 text-xs font-sans uppercase tracking-widest mb-2">Navegue por</p>
        <h2 className="section-title">Categorias</h2>
        <div className="gold-divider" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/catalog?category=${cat.slug}`}
            className={`relative group rounded-xl overflow-hidden bg-gradient-to-b ${cat.color} border border-graphite-800 hover:border-gold-500/40 p-6 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:shadow-premium hover:-translate-y-1`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
            <div>
              <p className="font-serif font-semibold text-off-white">{cat.label}</p>
              <p className="text-graphite-500 text-xs font-sans mt-0.5">{cat.desc}</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
}
