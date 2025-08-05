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
    text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    tafsir: '<b>الحمد</b>: هو الثناء على الله بصفاته ونعمه، وهو يتضمن أمر عباده أن يحمدوه. <br> <b>رب العالمين</b>: الخالق الرازق المحيي المميت المربي لجميع خلقه بنعمه.'
  },
  {
    text: 'الرَّحْمَٰنِ الرَّحِيمِ',
    tafsir: '<b>الرحمن</b>: ذي الرحمة العامة لكل الخلق. <b>الرحيم</b>: بالمؤمنين'
  },
  {
    text: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ',
    tafsir: 'أي يوم القيامة'
  },
  {
    text: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ',
    tafsir: 'أي نعبدك وحدك ونستعين بك وحدك، فالأمر كله بيدك، وهذا يدل على أنه لا يجوز صرف شيء من العبادات لغير الله.'
  },
  {
    text: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ',
    tafsir: 'أي <b>دلنا</b> على الطريق الواضح الموصل إلى رضوان الله.'
  },
  {
    text: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ',
    tafsir: 'طريق الذين أنعمت عليهم من <b>النبيين والصديقين والشهداء والصالحين</b> <br> (غير المغضوب عليهم ولا الضالين). <b>المغضوب عليهم</b>: من عرفوا الحق ولم يعملوا به. <br> <b>الضالين</b>: من لم يعرفوا الحق ولم يعملوا به.'
  }
];


rubtTassweerySections = [
  {
    title: '🕊️ الثناء على اللَّه',
    description: 'تبدأ السورة بحمد اللَّه وتمجيده وذكر صفاته',
    verses: [
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      'الرَّحْمَٰنِ الرَّحِيمِ',
      'مَٰلِكِ يَوۡمِ ٱلدِّينِ'
    ]
  },
  {
    title: '🧎‍♂️ التوجه و العبودية ',
    description: 'نعلن عبوديتنا للَّه وحده واستعانتنا به',
    verses: [
      'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ'
    ]
  },
  {
    title: '🌟 طلب الهداية',
    description: 'ندعو اللَّه أن يهدينا إلى الطريق المستقيم',
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




