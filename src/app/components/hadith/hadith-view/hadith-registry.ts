import { NAWAWI_HADITHS } from './data/hadith-data';
import { RYAD_BAB1_HADITHS } from './data/ryad-bab1-data'; // حسب مسار الملف لديك
import { RYAD_BAB2_HADITHS } from './data/ryad-bab2-data'; 
import { RYAD_BAB3_HADITHS } from './data/ryad-bab3-data'; 
import { RYAD_BAB4_HADITHS } from './data/ryad-bab4-data';
import { RYAD_BAB5_HADITHS } from './data/ryad-bab5-data';
import { RYAD_BAB6_HADITHS } from './data/ryad-bab6-data';
import { NAWAWI_INTRO } from './data/intro-imam-nawawi'; 
export const HADITH_CATEGORIES: Record<string, { title: string; data: Record<string, any> }> = {
  'hadith-nawawi-40': {
    title: 'الأربعون النووية',
    data: NAWAWI_HADITHS
  },
   'nawawi-intro': {
    title: 'الإمام النووي',
    data: NAWAWI_INTRO
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
  },
  'ryad-bab-4': {
    title: 'رياض الصالحين - باب الصدق',
    data: RYAD_BAB4_HADITHS
  },
  'ryad-bab-5': {
    title: 'رياض الصالحين - باب المراقبة',
    data: RYAD_BAB5_HADITHS
  },
  'ryad-bab-6': {
    title: 'رياض الصالحين - باب التقوى',
    data: RYAD_BAB6_HADITHS
  }
  
};