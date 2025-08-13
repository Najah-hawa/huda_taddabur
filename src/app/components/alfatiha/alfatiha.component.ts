import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { SurahHintComponent } from "../surah-hint/surah-hint.component";
import { SurahsStartComponent } from '../surahs-start/surahs-start.component';
import { SurahTabsComponent } from "../surah-tabs/surah-tabs.component"; 
import { QuixTafserComponent } from '../quix-tafser/quix-tafser.component';
import { FawaedOfSurahComponent } from '../fawaed-of-surah/fawaed-of-surah.component';
import { FooterInfoComponent } from '../footer-info/footer-info.component';
import { NezzolComponent } from '../nezzol/nezzol.component';
@Component({
  selector: 'app-alfatiha',
  standalone: true,
  imports: [RouterModule, SurahHintComponent, SurahsStartComponent, SurahTabsComponent, CommonModule, FawaedOfSurahComponent, NezzolComponent, QuixTafserComponent, FooterInfoComponent],
  templateUrl: './alfatiha.component.html',
  styleUrl: './alfatiha.component.css'
})
export class AlfatihaComponent {

//fixa frågor för taddabur ab surah. först vvisa inte frågorna förään man klickar på knappen. 
  
showQuiz = false;

  showQuizSection() {
    this.showQuiz = true;
  }

// här anger vi frågorna som sska visas 
alfatihaQuestions = [
  
   {
    question: "لماذا سميت سورة الفاتحة بهذا الاسم؟",
    answers: [
      { text: "لأنها أول سورة نزلت", isCorrect: false },
      { text: "لأنها تفتتح بها الصلاة فقط", isCorrect: false },
      { text: "لأنه يفتتح بها القرآن", isCorrect: true },
      { text: "لأنها آخر سورة في المصحف", isCorrect: false }
    ]
  },
  {
    question: "ما معنى (الشيطان الرجيم)؟",
    answers: [
      { text: "الذي يحب الخير للناس", isCorrect: false },
      { text: "المطرود من رحمة الله", isCorrect: true },
      { text: "المؤمن القوي", isCorrect: false },
      { text: "العابد التقي", isCorrect: false }
    ]
  },
  {
    question: "ما الفرق بين (الرحمن) و(الرحيم)؟",
    answers: [
      { text: "كلاهما بمعنى واحد", isCorrect: false },
      { text: "الرحمن بالمؤمنين، والرحيم بكل الخلق", isCorrect: false },
      { text: "الرحمن رحمة عامة، والرحيم رحمة خاصة بالمؤمنين", isCorrect: true },
      { text: "الرحيم أرحم من الرحمن", isCorrect: false }
    ]
  },
  {
    question: "ما معنى (مالك يوم الدين)؟",
    answers: [
      { text: "مالك يوم الجمعة", isCorrect: false },
      { text: "مالك يوم القيامة", isCorrect: true },
      { text: "مالك الدنيا", isCorrect: false },
      { text: "مالك القرآن", isCorrect: false }
    ]
  },
  {
    question: "من هم (المغضوب عليهم)؟",
    answers: [
      { text: "الذين عرفوا الحق ولم يعملوا به", isCorrect: true },
      { text: "الذين لم يعرفوا الحق", isCorrect: false },
      { text: "المؤمنين", isCorrect: false },
      { text: "الصالحين", isCorrect: false }
    ]
  },
  {
    question: "من هم (الضالين)؟",
    answers: [
      { text: "الذين عرفوا الحق وتركوه", isCorrect: false },
      { text: "الذين لم يعرفوا الحق ولم يعملوا به", isCorrect: true },
      { text: "الأنبياء", isCorrect: false },
      { text: "الشهداء", isCorrect: false }
    ]
  },
  {
    question: "ما معنى (آمين) بعد قراءة الفاتحة؟",
    answers: [
      { text: "صدق الله العظيم", isCorrect: false },
      { text: "يا رب استجب", isCorrect: true },
      { text: "اللهم اغفر لنا", isCorrect: false },
      { text: "لا معنى لها", isCorrect: false }
    ]
  },
];




shown: boolean[] = [];

 verses = [
  {
    number: 2,
    text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    tafsir: '<b>الحمد</b>: هو الثناء على الله بصفاته ونعمه، وهو يتضمن أمر عباده أن يحمدوه. <br> <b>رب العالمين</b>: الخالق، الرازق، المحيي، المميت، المربي لجميع خلقه بنعمه.'
  },
  {
    number: 3,
    text: 'الرَّحْمَٰنِ الرَّحِيمِ',
    tafsir: '<b>الرحمن</b>: صاحب الرحمة العامة لجميع الخلق. <br> <b>الرحيم</b>: صاحب الرحمة الخاصة بالمؤمنين.'
  },
  {
    number: 4,
    text: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ',
    tafsir: 'مالك أمر <b>يوم القيامة</b> الذي يُجازي فيه العباد على أعمالهم، فيثيب المطيع ويعاقب العاصي.'
  },
  {
    number: 5,
    text: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ',
    tafsir: 'نخصك وحدك بالعبادة ونخصك وحدك بالاستعانة، فلا نعبد إلا إياك ولا نستعين إلا بك، إذ الأمر كله بيدك.'
  },
  {
    number: 6,
    text: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ',
    tafsir: 'وجّهنا ودلّنا وثبّتنا على الطريق المستقيم، طريق الحق الذي يوصل إلى رضاك وجنّتك.'
  },
  {
    number: 7,
    text: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ',
    tafsir: '<b>صراط الذين أنعمت عليهم</b>: طريق <b>النبيين</b> و<b>الصديقين</b> و<b>الشهداء</b> و<b>الصالحين</b>. <br> <b>غير المغضوب عليهم</b>: من عرفوا الحق وتركوه (مثل اليهود). <br> <b>ولا الضالين</b>: من جهلوا الحق وانحرفوا عنه (مثل النصارى).'
  }
];



rubtTassweerySections = [
  {
    title: '🕊️ الثناء على اللَّه',
    description: 'تبدأ السورة بحمد اللَّه وتمجيده، وذكر صفاته العظيمة التي تبعث في القلب الطمأنينة، فهو رب العالمين، الرحمن الرحيم، مالك يوم الدين، مما يهيئ النفس للتوجه الصادق إليه.',
    verses: [
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      'الرَّحْمَٰنِ الرَّحِيمِ',
      'مَٰلِكِ يَوۡمِ ٱلدِّينِ'
    ]
  },
  {
    title: '🧎‍♂️ التوجه و العبودية',
    description: 'بعد الثناء يأتي الإقرار بالعبودية الكاملة لله وحده، وطلب العون منه في كل أمر، فهو وحده المستحق للعبادة والاستعانة.',
    verses: [
      'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ'
    ]
  },
  {
    title: '🌟 طلب الهداية',
    description: 'ثم نختم بطلب أعظم ما يحتاجه الإنسان في حياته وآخرته: الهداية إلى الصراط المستقيم، طريق المنعَم عليهم، واجتناب طريق المغضوب عليهم والضالين، ليكتمل بذلك الدعاء الشامل.',
    verses: [
      'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ',
      'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ',
    ]
  }
];


expandedSections: { [key: number]: boolean } = {};

toggleExpanded(index: number) {
  this.expandedSections[index] = !this.expandedSections[index];
}


toggleVerse(index: number) {
    this.shown[index] = !this.shown[index];
  }

  
}




