import { Car, MapPin, Navigation, Users, Coffee } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.607!2d32.7337!3d39.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f8a0a4a7e2d%3A0x9c6b1e3b8e0a1234!2sTun%C3%A7alp%20%C3%96zgen%20Kongre%20ve%20Konferans%20Merkezi!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str';
const DIRECTIONS =
  'https://www.google.com/maps/dir//Tun%C3%A7alp+%C3%96zgen+Kongre+ve+Konferans+Merkezi,+Hacettepe+%C3%9Cniversitesi,+Ankara';

const features = [
  { icon: Users, text: '300 kişilik konferans salonu' },
  { icon: Coffee, text: 'Geniş fuaye alanı' },
  { icon: Car, text: 'Ücretsiz otopark' },
];

export default function Location() {
  return (
    <section id="konum" className="section">
      <div className="container-page">
        <SectionHeader eyebrow="Konum" title="Nasıl ulaşılır?" />

        <Reveal>
          <div className="grid overflow-hidden rounded-lg border border-white/15 bg-night/70 lg:grid-cols-[1.5fr_1fr]">
            <div className="relative min-h-[280px] sm:min-h-[380px]">
              <iframe
                title="Etkinlik konumu"
                src={MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(200deg)_saturate(0.7)_brightness(0.95)]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 sm:p-10">
              <div>
                <MapPin className="h-8 w-8 text-fg" strokeWidth={1.5} />
                <h3 className="mt-5 text-2xl font-extrabold uppercase text-fg">Mehmet Akif Ersoy K Salonu</h3>
                <p className="mt-1 text-fg-muted">Hacettepe Üniversitesi, Beytepe Kampüsü, Ankara</p>
              </div>

              <ul className="space-y-3 border-t border-white/10 pt-6">
                {features.map(f => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-fg-muted">
                    <f.icon className="h-4 w-4 text-brand-soft" /> {f.text}
                  </li>
                ))}
              </ul>

              <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <Navigation className="h-4 w-4" /> Yol Tarifi Al
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
