import { NAWAWI_HADITHS } from './data/hadith-data';
import { RYAD_BAB1_HADITHS } from './data/ryad-bab1-data'; // حسب مسار الملف لديك
import { RYAD_BAB2_HADITHS } from './data/ryad-bab2-data'; 
import { RYAD_BAB3_HADITHS } from './data/ryad-bab3-data'; 
import { RYAD_BAB4_HADITHS } from './data/ryad-bab4-data';
import { RYAD_BAB5_HADITHS } from './data/ryad-bab5-data';
import { RYAD_BAB6_HADITHS } from './data/ryad-bab6-data';
import { RYAD_BAB7_HADITHS } from './data/ryad-bab7-data';
import { RYAD_BAB8_HADITHS } from './data/ryad-bab8-data';
import { RYAD_BAB9_HADITHS } from './data/ryad-bab9-data';
import { RYAD_BAB10_HADITHS } from './data/ryad-bab10-data';
import { RYAD_BAB127_HADITHS } from './data/ryad-bab127-data'; 
import { RYAD_BAB128_HADITHS } from './data/ryad-bab128-data';
import { RYAD_BAB129_HADITHS } from './data/ryad-bab129-data';
import { RYAD_BAB130_HADITHS } from './data/ryad-bab130-data';
import { RYAD_BAB131_HADITHS } from './data/ryad-bab131-data';
import { RYAD_BAB132_HADITHS } from './data/ryad-bab132-data';

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
  },
  'ryad-bab-7': {
    title: 'رياض الصالحين - باب اليقين والتوكل',
    data: RYAD_BAB7_HADITHS
  },
  'ryad-bab-8': {
    title: 'رياض الصالحين - باب  الاستقامة',
    data: RYAD_BAB8_HADITHS
  },
  'ryad-bab-9': {
    title: ' رياض الصالحين - باب  التفكر في عظيم مخلوقات الله ',
    data: RYAD_BAB9_HADITHS
  },
  'ryad-bab-10': {
    title: ' رياض الصالحين - باب المبادرة إلى الخيرات ',
    data: RYAD_BAB10_HADITHS
  },
  'ryad-bab-127': {
    title:  'باب مايقوله عند النوم والاضجاع والقعود' ,
    data: RYAD_BAB127_HADITHS
  },
  'ryad-bab-128': {
    title: 'باب جواز الاستلقاء على القفا ووضع إحدى الرجلين على الأخرى إذا لم يخف انكشاف العورة ، وجواز القعود متربعاً ومحتبياً',
    data: RYAD_BAB128_HADITHS
  },
  'ryad-bab-129': {
    title: 'باب اداب المجالس والجليس',
    data: RYAD_BAB129_HADITHS
  },
  'ryad-bab-130': {
    title: 'باب الرؤيا وما يتعلق بها',
    data: RYAD_BAB130_HADITHS
  },
  'ryad-bab-131': {
    title: 'باب فضل السلام والأمر بإفشائه ',
    data: RYAD_BAB131_HADITHS
  },
  'ryad-bab-132': {
    title: 'باب كيفية السلام',
    data: RYAD_BAB132_HADITHS
  }





};