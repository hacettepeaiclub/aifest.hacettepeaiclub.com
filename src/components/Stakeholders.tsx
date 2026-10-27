import { InstagramIcon } from './icons';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const partners = [
  { badge: 'Ankara BÖTE', name: 'Ankara Üniversitesi BÖTE Topluluğu', logo: 'ankaraunibote_logo.jpg', instagram: 'https://www.instagram.com/ankaraunibote/' },
  { badge: 'METU CClub', name: 'ODTÜ Bilgisayar Topluluğu', logo: 'metu_cclub.png', instagram: 'https://www.instagram.com/metucclub/' },
  { badge: 'Bilkent MEC', name: 'Bilkent Üniversitesi İşletme ve Ekonomi Topluluğu', logo: 'bilkent_mec.png', instagram: 'https://www.instagram.com/bilkentmec/' },
  { badge: 'IEEE Atılım', name: 'Atılım Üniversitesi IEEE Topluluğu', logo: 'ieee_atilim.jpg', instagram: 'https://www.instagram.com/ieeeatilim/' },
  { badge: 'HÜİST', name: 'Hacettepe Üniversitesi İstatistik ve Veri Bilimi Topluluğu', logo: 'huist.png', instagram: 'https://www.instagram.com/huistatistik/' },
  { badge: 'Gazi Cyber', name: 'Gazi Üniversitesi Siber Güvenlik Topluluğu', logo: 'gazi_cyber.png', instagram: 'https://www.instagram.com/gazicyber/' },
  { badge: 'Atılım AI', name: 'Atılım Üniversitesi Yapay Zeka Topluluğu', logo: 'atilim_logo.png', instagram: 'https://www.instagram.com/atilimai/' },
  { badge: 'Bilkent YES', name: 'Bilkent Üniversitesi Genç Girişimciler Topluluğu', logo: 'bilkent_yes.png', instagram: 'https://www.instagram.com/bilkentyes/' },
  { badge: 'Ankara YAZGİT', name: 'Ankara Üniversitesi Yapay Zeka ve Görüntü İşleme Topluluğu', logo: 'ankara_yazgit.png', instagram: 'https://www.instagram.com/au_yazgit/' },
];

export default function Stakeholders() {
  return (
    <section id="paydaslar" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Paydaş Topluluklar"
          title="Birlikte büyüyoruz"
          description="AI FEST'i birlikte şekillendirdiğimiz öğrenci toplulukları."
        />

        <div className="grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.badge} delay={(i % 3) * 0.05}>
              <div className="flex items-center gap-4 border-b border-white/10 py-5 sm:pr-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                  <img src={`${import.meta.env.BASE_URL}${p.logo}`} alt="" loading="lazy" className="h-full w-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.06em] text-fg">{p.badge}</p>
                  <p className="mt-0.5 text-sm leading-snug text-fg-muted">{p.name}</p>
                </div>
                <a
                  href={p.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.badge} Instagram`}
                  className="icon-btn !border-transparent"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
