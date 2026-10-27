import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { InstagramIcon, LinkedInIcon, XIcon, YoutubeIcon } from './icons';
import { REGISTER_URL } from '../lib/links';
import { navItems } from './navItems';
import logo from '../assets/aifest_logo.png';

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/hacettepeaiclub' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/hacettepeaiclub' },
  { icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com/hacettepeaiclub' },
  { icon: XIcon, label: 'X', href: 'https://x.com/hacettepeaiclub' },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="relative mt-10 border-t border-white/15 bg-night/90">
      <div className="container-page">
        {/* CTA şeridi */}
        <div className="relative -mt-px flex flex-col items-center gap-6 border-b border-white/10 py-14 text-center sm:py-16">
          <h2 className="text-3xl font-black uppercase sm:text-5xl">3 – 4 Kasım'da görüşmek üzere</h2>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg">
            Kayıt Ol <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-auto" />
              <div>
                <p className="font-display text-lg font-extrabold text-fg">AI FEST'26</p>
                <p className="text-xs text-fg-subtle">Hacettepe Üniversitesi Yapay Zeka Topluluğu</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">
              2018'den bugüne yapay zeka dünyasına adım atmak isteyen herkesi bir araya getiriyoruz.
            </p>
          </div>

          <div>
            <h4 className="eyebrow">Sayfa</h4>
            <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {navItems.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="eyebrow">Bize ulaşın</h4>
            <div className="mt-4 space-y-2.5">
              <a href="https://hacettepeaiclub.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
                <Globe className="h-4 w-4" /> hacettepeaiclub.com
              </a>
              <a href="mailto:contact@hacettepeaiclub.com" className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
                <Mail className="h-4 w-4" /> contact@hacettepeaiclub.com
              </a>
            </div>
            <div className="mt-5 flex gap-2">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-fg-subtle">
          © {new Date().getFullYear()} Hacettepe Üniversitesi Yapay Zeka Topluluğu · AI FEST
        </div>
      </div>
    </footer>
  );
}
