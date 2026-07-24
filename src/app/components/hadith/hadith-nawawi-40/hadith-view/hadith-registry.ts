import { NAWAWI_HADITHS } from './hadith-data';
import { RYAD_BAB1_HADITHS } from './ryad-bab1-data'; // حسب مسار الملف لديك
import { RYAD_BAB2_HADITHS } from './ryad-bab2-data'; 
import { RYAD_BAB3_HADITHS } from './ryad-bab3-data'; 
export const HADITH_CATEGORIES: Record<string, { title: string; data: Record<string, any> }> = {
  'hadith-nawawi-40': {
    title: 'الأربعون النووية',
    data: NAWAWI_HADITHS
  },
  'ryad-bab-1': {
    title: 'رياض الصالحين - باب الإخلاص',
    data: RYAD_BAB1_HADITHS
  },
  'ryad-bab-2': {
    title: 'رياض الصالحين - باب التوبة',
    data: RYAD_BAB2_HADITHS
  },
  'ryad-bab-3': {
    title: 'رياض الصالحين - باب الصبر',
    data: RYAD_BAB3_HADITHS
  }
};