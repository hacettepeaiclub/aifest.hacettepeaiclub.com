/*
 * AI FEST'26 program akışı.
 * Oturum ID'leri (d1-s1 …) backend'deki FEST_SESSIONS listesiyle
 * (hacettepeaiclub.com/Backend/routers/aifest.py) birebir aynı olmalı: yoklama bu ID ile kaydedilir.
 */

import { speakers, type SpeakerId } from './speakers';

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

/*
 * Oturumlar konuşmacılara bağlanır; konu, isim ve kurum src/data/speakers.ts'den gelir.
 * Konuşmacısı olmayan oturumlarda `topic` (ve varsa `org`) elle verilir.
 */
type SessionInput = { id: string; time: string; speakers?: SpeakerId[]; topic?: string; org?: string };

function session(n: number, input: SessionInput): ProgramSession {
  const people = (input.speakers ?? []).map(id => speakers[id]);
  return {
    kind: 'session',
    id: input.id,
    time: input.time,
    label: `${n}. Oturum`,
    topic: input.topic ?? people[0]?.title ?? 'Yakında açıklanacak',
    speaker: people.length ? people.map(p => p.name).join(' & ') : undefined,
    org: people.length ? people.map(p => p.org).join(' & ') : input.org,
  };
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
      session(1, { id: 'd1-s1', time: '10:00 – 10:45', speakers: ['merve'] }),
      session(2, { id: 'd1-s2', time: '11:00 – 11:45', speakers: ['bahar'] }),
      { kind: 'break', time: '11:45 – 12:30', label: 'Öğle Arası', icon: 'lunch' },
      session(3, { id: 'd1-s3', time: '12:30 – 13:15', topic: 'TUSAŞ Oturumu', org: 'TUSAŞ' }),
      session(4, { id: 'd1-s4', time: '13:30 – 14:15', speakers: ['fatih'] }),
      { kind: 'break', time: '14:15 – 14:45', label: 'Kahve & Networking', icon: 'coffee' },
      session(5, { id: 'd1-s5', time: '14:45 – 15:30', speakers: ['sinan'] }),
      session(6, { id: 'd1-s6', time: '15:45 – 16:30', speakers: ['suleyman'] }),
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
      session(1, { id: 'd2-s1', time: '10:00 – 10:45', speakers: ['cagdas'] }),
      session(2, { id: 'd2-s2', time: '11:00 – 11:45', speakers: ['ata', 'azra'] }),
      { kind: 'break', time: '11:45 – 12:30', label: 'Öğle Arası', icon: 'lunch' },
      session(3, { id: 'd2-s3', time: '12:30 – 13:15', speakers: ['serhat'] }),
      session(4, { id: 'd2-s4', time: '13:30 – 14:15', speakers: ['ege'] }),
      { kind: 'break', time: '14:15 – 14:45', label: 'Kahve & Networking', icon: 'coffee' },
      session(5, { id: 'd2-s5', time: '14:45 – 15:30', speakers: ['aytac'] }),
      session(6, { id: 'd2-s6', time: '15:45 – 16:30', speakers: ['burak'] }),
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
