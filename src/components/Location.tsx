import { Car, MapPin, Navigation, Users, Coffee } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

// Mehmet Akif Ersoy K-Salonu, Beytepe (39.868004, 32.737233)
const MAP_EMBED = 'https://maps.google.com/maps?q=39.868004,32.7372327&z=17&hl=tr&output=embed';
const DIRECTIONS = 'https://maps.app.goo.gl/42KwXeuGJLjj4MJZ8';

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
