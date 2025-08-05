import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-surah-78',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SurahHintComponent,
    SurahsStartComponent,
    SurahTabsComponent,
    QuixTafserComponent,
    FooterInfoComponent
  ],
  templateUrl: './surah-78.component.html',
  styleUrl: './surah-78.component.css'
})
export class Surah78Component {
  // flikstyrning
  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';

  // toggling av tafsir
  shown: boolean[] = [];

  // verser
 verses = [
  { number: 1, text: 'عَمَّ يَتَسَاءَلُونَ', tafsir: '' },
  { number: 2, text: 'عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ', tafsir: '' },
  { number: 3, text: 'ٱلَّذِي هُمْ فِيهِ مُخْتَلِفُونَ', tafsir: '' },
  { number: 4, text: 'كَلَّا سَيَعْلَمُونَ', tafsir: '' },
  { number: 5, text: 'ثُمَّ كَلَّا سَيَعْلَمُونَ', tafsir: '' },
  { number: 6, text: 'أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَادًا', tafsir: '' },
  { number: 7, text: 'وَٱلْجِبَالَ أَوْتَادًا', tafsir: '' },
  { number: 8, text: 'وَخَلَقْنَاكُمْ أَزْوَاجًا', tafsir: '' },
  { number: 9, text: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا', tafsir: '' },
  { number: 10, text: 'وَجَعَلْنَا ٱلَّيْلَ لِبَاسًا', tafsir: '' },
  { number: 11, text: 'وَجَعَلْنَا ٱلنَّهَارَ مَعَاشًا', tafsir: '' },
  { number: 12, text: 'وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا', tafsir: '' },
  { number: 13, text: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا', tafsir: '' },
  { number: 14, text: 'وَأَنْزَلْنَا مِنَ ٱلْمُعْصِرَاتِ مَاءً ثَجَّاجًا', tafsir: '' },
  { number: 15, text: 'لِّنُخْرِجَ بِهِۦ حَبًّا وَنَبَاتًا', tafsir: '' },
  { number: 16, text: 'وَجَنَّاتٍ أَلْفَافًا', tafsir: '' },
  { number: 17, text: 'إِنَّ يَوْمَ ٱلْفَصْلِ كَانَ مِيقَاتًا', tafsir: '' },
  { number: 18, text: 'يَوْمَ يُنْفَخُ فِي ٱلصُّورِ فَتَأْتُونَ أَفْوَاجًا', tafsir: '' },
  { number: 19, text: 'وَفُتِحَتِ ٱلسَّمَآءُ فَكَانَتْ أَبْوَابًا', tafsir: '' },
  { number: 20, text: 'وَسُيِّرَتِ ٱلْجِبَالُ فَكَانَتْ سَرَابًا', tafsir: '' },
  { number: 21, text: 'إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا', tafsir: '' },
  { number: 22, text: 'لِلطَّاغِينَ مَآبًا', tafsir: '' },
  { number: 23, text: 'لَّابِثِينَ فِيهَآ أَحْقَابًا', tafsir: '' },
  { number: 24, text: 'لَا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا', tafsir: '' },
  { number: 25, text: 'إِلَّا حَمِيمًا وَغَسَّاقًا', tafsir: '' },
  { number: 26, text: 'جَزَآءً وِفَاقًا', tafsir: '' },
  { number: 27, text: 'إِنَّهُمْ كَانُوا۟ لَا يَرْجُونَ حِسَابًا', tafsir: '' },
  { number: 28, text: 'وَكَذَّبُوا۟ بِـَٔايَاتِنَا كِذَّابًا', tafsir: '' },
  { number: 29, text: 'وَكُلَّ شَيْءٍ أَحْصَيْنَٰهُ كِتَٰبًا', tafsir: '' },
  { number: 30, text: 'فَذُوقُوا۟ فَلَن نَّزِيدَكُمْ إِلَّا عَذَابًا', tafsir: '' },
  { number: 31, text: 'إِنَّ لِلْمُتَّقِينَ مَفَازًا', tafsir: '' },
  { number: 32, text: 'حَدَآئِقَ وَأَعْنَابًا', tafsir: '' },
  { number: 33, text: 'وَكَوَاعِبَ أَتْرَابًا', tafsir: '' },
  { number: 34, text: 'وَكَأْسًا دِهَاقًا', tafsir: '' },
  { number: 35, text: 'لَا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّٰبًا', tafsir: '' },
  { number: 36, text: 'جَزَآءً مِّن رَّبِّكَ عَطَآءً حِسَابًا', tafsir: '' },
  { number: 37, text: 'رَّبِّ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ وَمَا بَيْنَهُمَا ٱلرَّحْمَٰنِ لَا يَمْلِكُونَ مِنْهُ خِطَابًا', tafsir: '' },
  { number: 38, text: 'يَوْمَ يَقُومُ ٱلرُّوحُ وَٱلْمَلَٰٓئِكَةُ صَفًّاۖ لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ ٱلرَّحْمَٰنُ وَقَالَ صَوَابًا', tafsir: '' },
  { number: 39, text: 'ذَٰلِكَ ٱلْيَوْمُ ٱلْحَقُّۖ فَمَن شَآءَ ٱتَّخَذَ إِلَىٰ رَبِّهِۦ مَـَٔابًا', tafsir: '' },
  { number: 40, text: 'إِنَّآ أَنذَرْنَٰكُمْ عَذَابًا قَرِيبًاۖ يَوْمَ يَنظُرُ ٱلْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ ٱلْكَافِرُ يَـٰلَيْتَنِى كُنتُ تُرَٰبًا', tafsir: '' }
];


  // fråga till quiz-komponenten
  alfatihaQuestions = [
    {
      question: "لماذا سميت سورة الفاتحة بهذا الاسم؟",
      answers: [
        { text: "لأنها أول سورة نزلت", isCorrect: false },
        { text: "لأنه يفتتح بها القرآن", isCorrect: true },
        { text: "لأنها آخر سورة في المصحف", isCorrect: false },
        { text: "لأنها تفتتح بها الصلاة فقط", isCorrect: false }
      ]
    },
    // ... (fler frågor)
  ];

  rubtTassweerySections = [
    {
      title: '🕊️ الثناء على اللَّه',
      description: 'تبدأ السورة بحمد اللَّه وتمجيده...',
      verses: [
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَٰلِكِ يَوۡمِ ٱلدِّينِ'
      ]
    },
    {
      title: '🧎‍♂️ التوجه و العبودية',
      description: 'نعلن عبوديتنا للَّه وحده...',
      verses: [
        'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ'
      ]
    },
    {
      title: '🌟 طلب الهداية',
      description: 'ندعو اللَّه أن يهدينا...',
      verses: [
        'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ',
        'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ...'
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

  // uppdatera vald flik
  onTabChange(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
  }
}
