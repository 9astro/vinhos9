'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wine, ShoppingBag, Image, Tag, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin',          label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produtos',   icon: Wine },
  { href: '/admin/orders',   label: 'Pedidos',    icon: ShoppingBag },
  { href: '/admin/banners',  label: 'Banners',    icon: Image },
  { href: '/admin/coupons',  label: 'Cupons',     icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const supabase = createBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const NavLinks = () => (
    <nav className="flex flex-col gap-1 flex-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm font-medium transition-colors',
              active
                ? 'bg-bordeaux-800 text-off-white'
                : 'text-graphite-400 hover:text-off-white hover:bg-graphite-800'
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-graphite-900 border border-graphite-800 rounded-lg flex items-center justify-center text-graphite-400"
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-graphite-950/80" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-40 w-56 bg-graphite-900 border-r border-graphite-800 flex flex-col p-4 transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="mb-6 px-2 pt-2">
          <p className="font-serif text-lg font-bold text-off-white">Vinheria</p>
          <p className="text-gold-500 text-xs font-sans">Painel Admin</p>
        </div>

        <NavLinks />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-graphite-500 hover:text-bordeaux-400 hover:bg-graphite-800 font-sans text-sm font-medium transition-colors mt-2"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </aside>
    </>
  );
}
