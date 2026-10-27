/*
 * AI Fest '26 program akışı.
 * Oturum ID'leri (d1-s1 …) backend'deki FEST_SESSIONS listesiyle
 * (hacettepeaiclub.com/Backend/routers/aifest.py) birebir aynı olmalı: yoklama bu ID ile kaydedilir.
 */

export type BreakIcon = 'registration' | 'opening' | 'lunch' | 'coffee' | 'closing';

export interface ProgramSession {
  kind: 'session';
  id: string;
  time: string;
  label: string;
  topic: string;
  speaker?: string;
  org?: string;
}

export interface ProgramBreak {
  kind: 'break';
  time: string;
  label: string;
  icon: BreakIcon;
}

export type ProgramItem = ProgramSession | ProgramBreak;

export interface ProgramDay {
  day: 1 | 2;
  date: string; // YYYY-MM-DD
  title: string;
  weekday: string;
  items: ProgramItem[];
}

export const programDays: ProgramDay[] = [
  {
    day: 1,
    date: '2026-11-03',
    title: '3 Kasım',
    weekday: 'Salı',
    items: [
      { kind: 'break', time: '09:30 – 09:45', label: 'Kayıt & Karşılama', icon: 'registration' },
      { kind: 'break', time: '09:45 – 10:00', label: 'Açılış Konuşması', icon: 'opening' },
      { kind: 'session', id: 'd1-s1', time: '10:00 – 10:45', label: '1. Oturum', topic: 'Otomotiv Sektöründe Yapay Zeka', speaker: 'Merve Benlikaş Demirbağ', org: 'Ford Otosan' },
      { kind: 'session', id: 'd1-s2', time: '11:00 – 11:45', label: '2. Oturum', topic: 'Yapay Zeka Yönetişimi ve Güvenliği', speaker: 'Bahar Serçin Halefoğlu', org: 'ALSE Data CEO · AI Governance Advisor' },
      { kind: 'break', time: '11:45 – 12:30', label: 'Öğle Arası', icon: 'lunch' },
      { kind: 'session', id: 'd1-s3', time: '12:30 – 13:15', label: '3. Oturum', topic: 'TUSAŞ Oturumu', org: 'TUSAŞ' },
      { kind: 'session', id: 'd1-s4', time: '13:30 – 14:15', label: '4. Oturum', topic: 'Şirketlerde Rota Yeniden Hesaplanıyor', speaker: 'Dr. Fatih Hattatoğlu', org: 'Wise Maple · AI Strategist & Data Scientist' },
      { kind: 'break', time: '14:15 – 14:45', label: 'Kahve & Networking', icon: 'coffee' },
      { kind: 'session', id: 'd1-s5', time: '14:45 – 15:30', label: '5. Oturum', topic: 'Fintech Sektöründe Yapay Zeka', speaker: 'Burak Tunca', org: 'PayTR' },
      { kind: 'session', id: 'd1-s6', time: '15:45 – 16:30', label: '6. Oturum', topic: 'Yakında açıklanacak' },
      { kind: 'break', time: '16:30', label: 'Kapanış', icon: 'closing' },
    ],
  },
  {
    day: 2,
    date: '2026-11-04',
    title: '4 Kasım',
    weekday: 'Çarşamba',
    items: [
      { kind: 'break', time: '09:30 – 09:45', label: 'Kayıt & Karşılama', icon: 'registration' },
      { kind: 'break', time: '09:45 – 10:00', label: 'Açılış Konuşması', icon: 'opening' },
      { kind: 'session', id: 'd2-s1', time: '10:00 – 10:45', label: '1. Oturum', topic: "Yapay Zeka'nın Geleceği", speaker: 'Çağdaş Hakan Aladağ', org: 'Hacettepe Üniversitesi · İstatistik' },
      { kind: 'session', id: 'd2-s2', time: '11:00 – 11:45', label: '2. Oturum', topic: 'Siber Güvenlikte Yapay Zeka', speaker: 'Ata Seren & Azra Melis Ertan', org: 'HAVELSAN & Trendyol' },
      { kind: 'break', time: '11:45 – 12:30', label: 'Öğle Arası', icon: 'lunch' },
      { kind: 'session', id: 'd2-s3', time: '12:30 – 13:15', label: '3. Oturum', topic: 'ASELSAN Oturumu', org: 'ASELSAN' },
      { kind: 'session', id: 'd2-s4', time: '13:30 – 14:15', label: '4. Oturum', topic: 'Model Değil: Sistem', speaker: 'Ege Mert Gülderen', org: 'DeePix' },
      { kind: 'break', time: '14:15 – 14:45', label: 'Kahve & Networking', icon: 'coffee' },
      { kind: 'session', id: 'd2-s5', time: '14:45 – 15:30', label: '5. Oturum', topic: 'E-Ticaretin Geleceği ve Yapay Zeka', speaker: 'Aytaç Mestçi', org: 'MarkeFront · Digital Ecosystem Innovator' },
      { kind: 'session', id: 'd2-s6', time: '15:45 – 16:30', label: '6. Oturum', topic: 'Yakında açıklanacak' },
      { kind: 'break', time: '16:30', label: 'Kapanış', icon: 'closing' },
    ],
  },
];

export const allSessions = programDays.flatMap(day =>
  day.items.filter((i): i is ProgramSession => i.kind === 'session').map(session => ({ day, session })),
);

export function findSession(id: string) {
  return allSessions.find(s => s.session.id === id) ?? null;
}

/** "Konuşmacı — Kurum" ya da kurum/konu. */
export function sessionByline(s: ProgramSession) {
  return [s.speaker, s.org].filter(Boolean).join(' · ');
}

/* ───────── Şu anki oturum (yoklama kısayolu ve çekiliş ekranı için) ───────── */

/** Europe/Istanbul tarih (YYYY-MM-DD) ve gün içindeki dakika. */
function istanbulNow(now = new Date()) {
  const date = now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });
  const [h, m] = now
    .toLocaleTimeString('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hour12: false })
    .split(':')
    .map(Number);
  return { date, minutes: h * 60 + m };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.trim().split(':').map(Number);
  return h * 60 + m;
};

/** Etkinlik günlerinden birinde miyiz? (yoklama kısayolu yalnızca bu günlerde öne çıkar) */
export function isEventDay(now = new Date()) {
  const { date } = istanbulNow(now);
  return programDays.some(d => d.date === date);
}

/**
 * Yoklaması büyük ihtimalle açık olan oturum: bugün, başlangıçtan 10 dk önce ile bitişten
 * 20 dk sonrası arasındaysa o; değilse bugünün sıradaki oturumu; değilse son başlayan;
 * etkinlik günü değilse ilk oturum. (Backend'deki OPEN_BEFORE / CLOSE_AFTER ile aynı pencere.)
 */
export function currentSessionId(now = new Date()) {
  const { date, minutes } = istanbulNow(now);
  const today = allSessions.filter(s => s.day.date === date);
  if (today.length === 0) return allSessions[0].session.id;

  const range = (s: ProgramSession) => {
    const [start, end] = s.time.split('–');
    return { start: toMinutes(start), end: toMinutes(end ?? start) };
  };
  // Pencereler çakışırsa (ör. 10:50) en son başlayanı seç: salona yeni gelenler onun için yoklama verir.
  const open = today.filter(({ session }) => {
    const r = range(session);
    return minutes >= r.start - 10 && minutes <= r.end + 20;
  }).at(-1);
  const next = today.find(({ session }) => range(session).start > minutes);
  return (open ?? next ?? today.at(-1)!).session.id;
}
