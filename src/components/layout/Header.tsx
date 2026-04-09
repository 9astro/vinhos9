'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, X, Wine, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/catalog?category=tinto', label: 'Tintos' },
  { href: '/catalog?category=branco', label: 'Brancos' },
  { href: '/catalog?category=rose', label: 'Rosés' },
  { href: '/catalog?category=espumante', label: 'Espumantes' },
  { href: '/catalog?category=kit', label: 'Kits' },
  { href: '/catalog?sale=true', label: 'Ofertas', accent: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart(s => s.items);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-graphite-800 shadow-premium' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-bordeaux-800 flex items-center justify-center group-hover:bg-bordeaux-700 transition-colors">
                <Wine className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-serif font-bold text-lg text-off-white hidden sm:block">
                Vinheria <span className="text-gradient-gold">Premium</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'px-3 py-2 text-sm font-sans font-medium rounded-lg transition-colors',
                    l.accent ? 'text-gold-400 hover:text-gold-300 hover:bg-gold-500/10' : 'text-graphite-300 hover:text-off-white hover:bg-graphite-800'
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link href="/catalog" className="p-2 text-graphite-400 hover:text-off-white transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <Link href="/account/favorites" className="p-2 text-graphite-400 hover:text-off-white transition-colors hidden sm:flex">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/account/orders" className="p-2 text-graphite-400 hover:text-off-white transition-colors hidden sm:flex">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="relative p-2 text-graphite-300 hover:text-gold-400 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bordeaux-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-graphite-400 hover:text-off-white transition-colors ml-1"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 glass border-b border-graphite-800 p-4 animate-slide-up" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col gap-1">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'px-4 py-3 rounded-lg font-sans font-medium transition-colors',
                    l.accent ? 'text-gold-400' : 'text-graphite-200 hover:text-off-white hover:bg-graphite-800'
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-graphite-800 mt-2 pt-2 flex flex-col gap-1">
                <Link href="/account/orders" className="px-4 py-3 rounded-lg text-graphite-200 hover:bg-graphite-800 font-sans flex items-center gap-2">
                  <User className="w-4 h-4" /> Minha Conta
                </Link>
                <Link href="/account/favorites" className="px-4 py-3 rounded-lg text-graphite-200 hover:bg-graphite-800 font-sans flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Favoritos
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
