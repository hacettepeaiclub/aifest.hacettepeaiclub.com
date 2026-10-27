import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X } from 'lucide-react';
import { checkInUrl, type FestSessionInfo } from '../lib/fest-admin';
import SiteBackground from '../components/SiteBackground';
import logo from '../assets/aifest_logo.png';

/** Salona yansıtılacak tam ekran oturum kodu + QR. */
export default function ProjectCode({ session, onClose }: { session: FestSessionInfo; onClose: () => void }) {
  const [qr, setQr] = useState('');

  useEffect(() => {
    QRCode.toDataURL(checkInUrl(session.id), { width: 720, margin: 1, color: { dark: '#05051a', light: '#ffffff' } })
      .then(setQr)
      .catch(() => setQr(''));
  }, [session.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => {
      window.removeEventListener('keydown', onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-auto text-center text-white">
      <SiteBackground />
      <div className="relative z-10 flex min-h-full flex-col items-center justify-center gap-10 p-8">
        <button onClick={onClose} aria-label="Kapat" className="icon-btn absolute right-6 top-6 !h-12 !w-12">
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center">
          <img src={logo} alt="" className="h-16 w-auto" />
          <p className="eyebrow mt-6">Oturum Yoklaması</p>
          <h1 className="mt-3 max-w-5xl text-3xl font-extrabold uppercase text-white lg:text-5xl">{session.title}</h1>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {qr && (
            <img
              src={qr}
              alt="Yoklama QR kodu"
              className="h-[min(44vh,28rem)] w-[min(44vh,28rem)] rounded-xl bg-white p-5"
            />
          )}
          <div>
            <p className="text-xl text-fg-muted">Oturum kodu</p>
            <p className="mt-2 font-display text-[min(22vw,13rem)] font-black leading-none tracking-[0.12em] tabular-nums text-gradient">
              {session.code}
            </p>
            <p className="mx-auto mt-6 max-w-md text-lg text-fg-muted">
              QR'ı okut ya da <span className="font-semibold text-white">aifest.hacettepeaiclub.com/yoklama</span> adresine gir;
              TC/okul numaran, telefonunun son 4 hanesi ve bu kodla yoklamanı ver. Yoklama veren herkes çekilişe katılır!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
