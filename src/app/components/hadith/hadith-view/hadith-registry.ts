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
import { RYAD_BAB133_HADITHS } from './data/ryad-bab133-data';
import { RYAD_BAB134_HADITHS } from './data/ryad-bab134-data';
import { RYAD_BAB135_HADITHS } from './data/ryad-bab135-data';
import { RYAD_BAB136_HADITHS } from './data/ryad-bab136-data';
import { RYAD_BAB137_HADITHS } from './data/ryad-bab137-data';
import { RYAD_BAB138_HADITHS } from './data/ryad-bab138-data';
import { RYAD_BAB139_HADITHS } from './data/ryad-bab139-data';
import { RYAD_BAB140_HADITHS } from './data/ryad-bab140-data';
import { RYAD_BAB141_HADITHS } from './data/ryad-bab141-data';
import { RYAD_BAB142_HADITHS } from './data/ryad-bab142-data';
import { NAWAWI_INTRO } from './data/intro-imam-nawawi'; 
import { RYAD_BAB143_HADITHS } from './data/ryad-bab143-data';
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
  },
  'ryad-bab-133': {
    title: 'باب آداب السلام ',
    data: RYAD_BAB133_HADITHS
  },
  'ryad-bab-134': {
    title: ' باب استحباب إعادة السلام على من تكرر لقاؤه على قرب بأن دخل ثم خرج ثم دخل في الحال أو حال بينها شجرة ونحوها .',
    data: RYAD_BAB134_HADITHS
  },
  'ryad-bab-135': {
    title: 'باب استحباب السلام إذا دخل بيته ',
    data: RYAD_BAB135_HADITHS
  },
  'ryad-bab-136': {
    title: 'باب السلام على الصبيان ',
    data: RYAD_BAB136_HADITHS
  },
  'ryad-bab-137': {
    title: 'بابُ سلام الرجل على زوجته والمرأة من محارمه ، وعلى أجنبية وأجتنبيات لا يخاف الفتنة بهنَّ ، وسلامهنَّ بهذا الشرط.' ,
    data: RYAD_BAB137_HADITHS
  },
  'ryad-bab-138': {
    title: 'باب تحريم ابتدائنا الكفار بالسلام، وكيفية الرد عليهم واستحباب السلام مع أهل مجلس فيهم مسلمون وكفار',
    data: RYAD_BAB138_HADITHS
  },
  'ryad-bab-139': {
    title: 'باب استحباب السلام إذا قام من المجلس وفارق جلساءه أو جليسه',
    data: RYAD_BAB139_HADITHS
  },
  'ryad-bab-140': {
    title: 'باب الاستئذان وآدابه',
    data: RYAD_BAB140_HADITHS
  },
  'ryad-bab-141': {
    title: 'باب بيان أن السنة إذا قيل للمستأذن من أنت؟ أن يقول فلان فيسمي نفسه بما يعرف به من اسم أو كنية وكراهية قول أنا ونحوها',
    data: RYAD_BAB141_HADITHS
  },
  'ryad-bab-142': {
    title: ' باب استحباب تشميت العاطس إذا حمد الله تعالى وكراهية تشميته إذا لم يحمد الله تعالى وبيان آداب التشميت والعطاس والتثاوب',
    data: RYAD_BAB142_HADITHS
  },
  'ryad-bab-143': {
    title: 'باب استحباب المصافحة عند اللقاء وبشاشة الوجه وَتقبيل يد الرجل الصالح.. وَتقبيل ولده شفقة وَمعانقة القادم من السفر وَكراهية الانحناء',
    data: RYAD_BAB143_HADITHS
  }

};