import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Raleway } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AgeGate } from '@/components/pwa/AgeGate';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Vinheria Premium | Vinhos Selecionados', template: '%s | Vinheria Premium' },
  description: 'Descubra nossa curadoria exclusiva de vinhos nacionais e importados. Entrega rápida para todo o Brasil.',
  keywords: ['vinho', 'vinhos', 'vinho tinto', 'vinho branco', 'espumante', 'loja de vinhos', 'e-commerce vinho'],
  authors: [{ name: 'Vinheria Premium' }],
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinheria.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Vinheria Premium',
    title: 'Vinheria Premium | Vinhos Selecionados',
    description: 'Curadoria exclusiva de vinhos. Entrega rápida para todo o Brasil.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Vinheria Premium' }],
  },
  twitter: { card: 'summary_large_image', title: 'Vinheria Premium', description: 'Curadoria exclusiva de vinhos.' },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Vinheria' },
};

export const viewport: Viewport = {
  themeColor: '#6B1228',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${raleway.variable}`}>
      <body className="bg-graphite-950 text-off-white font-sans antialiased">
        <AgeGate />
        {children}
        <InstallPrompt />
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: '#27272f', color: '#faf8f5', border: '1px solid #3d3d47', fontFamily: 'var(--font-raleway)' },
            success: { iconTheme: { primary: '#C9A84C', secondary: '#27272f' } },
          }}
        />
      </body>
    </html>
  );
}
