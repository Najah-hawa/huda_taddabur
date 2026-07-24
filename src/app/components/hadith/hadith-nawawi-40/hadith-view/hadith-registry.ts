import { NAWAWI_HADITHS } from './hadith-data';
import { RYAD_BAB1_HADITHS } from './ryad-bab1-data'; // حسب مسار الملف لديك

export const HADITH_CATEGORIES: Record<string, { title: string; data: Record<string, any> }> = {
  'hadith-nawawi-40': {
    title: 'الأربعون النووية',
    data: NAWAWI_HADITHS
  },
  'ryad-bab-1': {
    title: 'رياض الصالحين - باب الإخلاص',
    data: RYAD_BAB1_HADITHS
  }
};