import { alfatiha } from './data/alfatiha-data';
import { juz30Data } from './data/juz30-data'; 

export const SURAH_REGISTRY: Record<string, any> = {
  'alfatiha': {
    title: { ar: 'الفاتحة', en: 'Al-Fatiha' },
    data: alfatiha
  },
  'juz-30': {
    title: { ar: 'جزء عم', en: 'Juz Amma' },
    data: juz30Data
  }
};

// 🌟 En ordnad lista över alla suror med flerspråkiga namn
export const SURAH_ORDER = [
  { key: 'alfatiha', category: 'alfatiha', name: { ar: 'الفاتحة', en: 'Al-Fatiha' } },
  { key: 'surah-78', category: 'juz-30', name: { ar: 'النبأ', en: 'An-Naba' } },
  { key: 'surah-79', category: 'juz-30', name: { ar: 'النازعات', en: 'An-Nazi\'at' } },
  { key: 'surah-80', category: 'juz-30', name: { ar: 'عبس', en: '\'Abasa' } },
  { key: 'surah-81', category: 'juz-30', name: { ar: 'التكوير', en: 'At-Takwir' } },
  { key: 'surah-82', category: 'juz-30', name: { ar: 'الإنفطار', en: 'Al-Infitar' } },
  { key: 'surah-83', category: 'juz-30', name: { ar: 'المطففين', en: 'Al-Mutaffifin' } },
  { key: 'surah-84', category: 'juz-30', name: { ar: 'الإنشقاق', en: 'Al-Inshiqaq' } },
  { key: 'surah-85', category: 'juz-30', name: { ar: 'البروج', en: 'Al-Burooj' } },
];