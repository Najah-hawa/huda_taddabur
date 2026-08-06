import { Component , OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { Title, Meta } from '@angular/platform-browser'; 
import { LanguageService } from '../../../services/language.service'; // 👈 Importera LanguageService här
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // 👈 ضروري لتشتغل routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // 👈 لازم يكون اسمها style**Urls**
})
export class HomeComponent implements OnInit {
  
  constructor(private titleService: Title, private metaService: Meta,   public langService: LanguageService) {}

  ngOnInit() {

    
    console.log('AppComponent startade! Anropar initAppLanguage()...');
    this.langService.initAppLanguage();
    // Sätter titeln i webbläsarfliken specifikt för startsidan
    this.titleService.setTitle('هدى وتدبر - الرئيسية');
    
    // Uppdaterar meta-beskrivningen om det behövs
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تطبيق هدى وتدبر يقدم شرحاً للقرآن الكريم، وعرضاً للأحاديث النبوية وخاصة الأربعين النووية، بالإضافة إلى أحكام الفقه الإسلامي.' 
    });
  }
// Orden för den animerade rubriken på arabiska
  public welcomeWordsAr = [
    'أهلاً', 'بك', 'في', 'رحاب', 'التأمل', 'والتدبر،', 'للقرآن', 'الكريم', 'و', 'الحديث', 'الشريف'
  ];

  // Orden för den animerade rubriken på engelska
  public welcomeWordsEn = [
    'Welcome', 'to', 'the', 'realm', 'of', 'reflection', 'and', 'contemplation', 'of', 'the', 'Holy', 'Quran', 'and', 'Noble', 'Hadith'
  ];

  // Texter för menykorten
  public menuTitles = {
    quran: {
      ar: 'القرآن الكريم',
      en: 'The Quran'
    },
    hadith: {
      ar: 'احاديث الأربعين النووية',
      en: 'Forty Hadith An-Nawawi'
    },
    quiz: {
      ar: 'مسابقات إسلامية',
      en: 'Islamic Quizzes'
    }
  };


}
