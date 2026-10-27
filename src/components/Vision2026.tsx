import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const goals = [
  {
    title: 'Çok Disiplinli Katılım',
    subtitle: 'Multidisipliner güç',
    description:
      'Katılımcı profilimizi Mühendislik Fakültesi ile sınırlı tutmuyoruz; İİBF, Tıp, Fen ve Edebiyat gibi yapay zekanın dönüştürdüğü tüm alanlardaki öğrencileri tek bir ekosistemde buluşturuyoruz. Ağını farklı disiplinlerden kişilerle genişlet.',
  },
  {
    title: 'İnteraktif Deneyim Alanları',
    subtitle: 'Deneyim pazarlaması',
    description:
      "Şirketlerin teknik gücünü ve kariyer olanaklarını yalnızca sahnede değil; fuaye alanındaki stantlarda, anlık mini-case yarışmalarında ve uygulamalı workshop'larda doğrudan deneyimle. Belli mi olur, belki bir staj ayarlarsın.",
  },
  {
    title: 'Genişletilmiş Ekosistem',
    subtitle: 'Çok sesli bir gençlik zirvesi',
    description:
      "Farklı üniversitelerden öğrenci topluluklarıyla kurduğumuz ortaklıklar ve fuayede açılan topluluk stantlarıyla AI FEST'i çok sesli bir gençlik zirvesine dönüştürüyor, farklı üniversitelerden öğrencilerle tanışman için alan açıyoruz.",
  },
];

export default function Vision2026() {
  return (
    <section id="vizyon" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Vizyon 2026"
          title="AI FEST'26'da seni neler bekliyor?"
          description="Her yıl katılımcı sayımızı ve çeşitliliğimizi büyütüyoruz. Bu yıl üç ana hedef üzerinden ilerliyoruz."
        />

        {/* Afişteki bilgi şeridi gibi: dikey çizgilerle ayrılmış üç sütun */}
        <div className="grid border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-white/15">
          {goals.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08} className="border-b border-white/10 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="font-display text-sm font-bold tabular-nums text-brand-soft">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-extrabold uppercase leading-tight text-fg sm:text-2xl">{g.title}</h3>
              <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">{g.subtitle}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">{g.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
