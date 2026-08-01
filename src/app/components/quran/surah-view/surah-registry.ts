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
  { key: 'surah-81', category: 'juz-30', name: 'التكوير' },
  { key: 'surah-82', category: 'juz-30', name: 'الإنفطار' },
  { key: 'surah-83', category: 'juz-30', name: 'المطففين' },
  { key: 'surah-84', category: 'juz-30', name: 'الإنشقاق' },
  { key: 'surah-85', category: 'juz-30', name: 'البروج' },

];
