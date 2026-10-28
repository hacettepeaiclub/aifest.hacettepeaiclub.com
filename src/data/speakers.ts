/*
 * AI FEST'26 konuşmacıları — tek kaynak.
 * Konuşmacılar bölümü ve program akışı (src/data/program.ts) buradan beslenir:
 * buradaki isim / konu (title) / kurum (org) değişince program da güncellenir.
 */

export interface Speaker {
  name: string;
  /** Konuşma konusu; programda oturum başlığı olarak da kullanılır. */
  title: string;
  org: string;
  linkedin?: string;
  image: string;
}

/** Etkinlik sunucusu — bölümün en üstünde ayrı gösterilir. */
export const host: Speaker = {
  name: 'Gürçin Gökçebağ',
  title: 'Educator & Strategist · Speaker',
  org: 'WeAcademyTR',
  linkedin: 'https://www.linkedin.com/in/gürçin-gökçebağ/',
  image: 'speakers/gurcin_gokcebag.png',
};

export const speakers = {
  merve: { name: 'Merve Benlikaş Demirbağ', title: 'Otomotiv Sektöründe Yapay Zeka', org: 'Senior Database Administrator @ Ford Otosan', linkedin: 'https://www.linkedin.com/in/merve-benlika%C5%9F-8b045b12a', image: 'speakers/merve_benlikas.png' },
  bahar: { name: 'Bahar Serçin Halefoğlu', title: 'Yapay Zeka Yönetişimi ve Güvenliği', org: 'ALSE Data CEO & AI Governance Advisor', linkedin: 'https://www.linkedin.com/in/baharsercinhalefoglu/', image: 'speakers/bahar_sercin_halefoglu.png' },
  fatih: { name: 'Fatih Hattatoğlu', title: 'Şirketlerde Rota Yeniden Hesaplanıyor', org: 'AI Strategist & Data Scientist @ Wise Maple', linkedin: 'https://www.linkedin.com/in/fatih-hattatoglu-phd/', image: 'speakers/fatih_hattatoglu.png' },
  sinan: { name: 'Dr. Sinan Onur Altınuç', title: 'Yapay Zeka Çağında İş Bulmak ve İşe Yaramak', org: 'Yapay Zekâ Danışmanı · Prometheus AI Kurucusu', image: 'speakers/sinan_onur_altinuc.jpg' },
  suleyman: { name: 'Prof. Dr. Süleyman Tosun', title: 'Yapay Zeka Odaklı Yonga Tasarımı', org: 'Prof. @ Hacettepe University', image: 'speakers/suleyman_tosun.jpg' },
  cagdas: { name: 'Prof. Dr. Çağdaş Hakan Aladağ', title: 'Çatıya Konan Ejderha', org: 'Prof. @ Hacettepe University', linkedin: 'https://www.linkedin.com/in/cagdas-hakan-aladag-279b9221/', image: 'speakers/cagdas_hakan_aladag.png' },
  ata: { name: 'Ata Seren', title: 'Siber Güvenlikte Yapay Zeka', org: 'Cyber Security Engineer @ HAVELSAN', linkedin: 'https://www.linkedin.com/in/ataseren', image: 'speakers/ata_seren.png' },
  azra: { name: 'Azra Melis Ertan', title: 'Siber Güvenlikte Yapay Zeka', org: 'Offensive Security Engineer @ Trendyol', linkedin: 'https://www.linkedin.com/in/azra-melis-ertan/', image: 'speakers/azra_melis_ertan.png' },
  serhat: { name: 'Serhat Özcan', title: 'ASELSAN Oturumu', org: 'Haberleşme ve Bilgi Teknolojileri Sektör Başkanlığı Müdürü @ ASELSAN', image: 'speakers/serhat_ozcan.jpg' },
  ege: { name: 'Ege Mert Gülderen', title: 'Model Değil: Sistem', org: 'AI Engineer & DeePix', linkedin: 'https://www.linkedin.com/in/egemertg%C3%BClderen/', image: 'speakers/ege_mert_gulderen.jpg' },
  aytac: { name: 'Aytaç Mestçi', title: 'E-Ticaretin Geleceği ve Yapay Zeka', org: 'Digital Ecosystem Innovator @ MarkeFront', linkedin: 'https://www.linkedin.com/in/aytacmestci/', image: 'speakers/aytac_mestci.png' },
  burak: { name: 'Burak Tunca', title: 'Fintech Sektöründe Yapay Zeka', org: 'AI & Data Specialist @ PayTR', linkedin: 'https://www.linkedin.com/in/buraktunca01', image: 'speakers/burak_tunca.jpg' },
} satisfies Record<string, Speaker>;

export type SpeakerId = keyof typeof speakers;

/** Konuşmacılar bölümündeki sıra: program sırası. */
export const speakerList: Speaker[] = Object.values(speakers);
