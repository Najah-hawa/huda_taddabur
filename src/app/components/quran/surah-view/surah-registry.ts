import { alfatiha} from './data/alfatiha-data';
import { juz30Data } from './data/juz30-data'; 

export const SURAH_REGISTRY: Record<string, any>= {
  'alfatiha': {
    title: 'الفاتحة',
    data: alfatiha
  },
   'juz-30': {
    title: 'جزء عم',
    data: juz30Data
  }
};

// 🌟 En ordnad lista över alla suror med deras URL-sträng och Visningsnamn
export const SURAH_ORDER = [
  { key: 'alfatiha', category: 'alfatiha', name: 'الفاتحة' },
  { key: 'surah-78', category: 'juz-30', name: 'النبأ' },
  { key: 'surah-79', category: 'juz-30', name: 'النازعات' },
  { key: 'surah-80', category: 'juz-30', name: 'عبس' },
  // ... här lägger du till alla suror i ordning upp till 114 (الناس)
];