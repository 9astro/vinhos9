'use client';
import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShow(false);
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('pwa-dismissed', '1');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto animate-slide-up">
      <div className="glass rounded-xl border border-gold-500/20 p-4 flex items-center gap-4 shadow-premium">
        <div className="w-10 h-10 rounded-lg bg-bordeaux-900 flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm font-semibold text-off-white">Instalar app</p>
          <p className="text-graphite-400 text-xs mt-0.5">Acesso rápido sem abrir o browser</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={install} className="px-3 py-1.5 bg-gold-500 text-graphite-950 text-xs font-semibold rounded-lg font-sans">
            Instalar
          </button>
          <button onClick={dismiss} className="text-graphite-500 hover:text-graphite-300 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
