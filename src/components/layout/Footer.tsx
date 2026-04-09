import Link from 'next/link';
import { Wine, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-graphite-950 border-t border-graphite-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bordeaux-800 flex items-center justify-center">
                <Wine className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-serif font-bold text-lg text-off-white">Vinheria <span className="text-gradient-gold">Premium</span></span>
            </div>
            <p className="text-graphite-400 text-sm font-sans leading-relaxed">
              Curadoria exclusiva de vinhos nacionais e importados para quem aprecia o que há de melhor na vida.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-graphite-800 flex items-center justify-center text-graphite-400 hover:text-gold-400 hover:bg-graphite-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">Categorias</h4>
            <ul className="flex flex-col gap-2">
              {[['Tintos', '/catalog?category=tinto'], ['Brancos', '/catalog?category=branco'], ['Rosés', '/catalog?category=rose'], ['Espumantes', '/catalog?category=espumante'], ['Kits', '/catalog?category=kit'], ['Ofertas', '/catalog?sale=true']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-graphite-400 hover:text-off-white text-sm font-sans transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">Ajuda</h4>
            <ul className="flex flex-col gap-2">
              {[['Minha Conta', '/account/orders'], ['Rastrear Pedido', '/account/orders'], ['Política de Troca', '/politica-troca'], ['Frete e Entrega', '/frete'], ['Política de Privacidade', '/privacidade'], ['Termos de Uso', '/termos']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-graphite-400 hover:text-off-white text-sm font-sans transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">Contato</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-graphite-400 text-sm font-sans">
                <Mail className="w-4 h-4 text-gold-500/70 flex-shrink-0" /> contato@vinheria.com.br
              </li>
              <li className="flex items-center gap-2 text-graphite-400 text-sm font-sans">
                <Phone className="w-4 h-4 text-gold-500/70 flex-shrink-0" /> (41) 99999-9999
              </li>
              <li className="flex items-start gap-2 text-graphite-400 text-sm font-sans">
                <MapPin className="w-4 h-4 text-gold-500/70 flex-shrink-0 mt-0.5" /> Curitiba, PR – Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-graphite-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-graphite-600 text-xs font-sans">
            © {new Date().getFullYear()} Vinheria Premium. Todos os direitos reservados.
          </p>
          <p className="text-graphite-600 text-xs font-sans text-center">
            🔞 Venda proibida para menores de 18 anos | Beba com moderação
          </p>
          <div className="flex items-center gap-3 text-graphite-700 text-xs font-sans">
            <span>Stripe</span><span>·</span><span>Melhor Envio</span><span>·</span><span>PIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
