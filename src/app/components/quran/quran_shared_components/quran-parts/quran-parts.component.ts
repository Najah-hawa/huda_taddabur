import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService } from '../../../../services/language.service'; // 👈 1. Importera din LanguageService (justera sökvägen om det behövs)

@Component({
  selector: 'app-quran-parts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quran-parts.component.html',
  styleUrl: './quran-parts.component.css'
})
export class QuranPartsComponent implements OnInit {

  // 🌟 Språkanpassad text för komponenten
  pageText = {
    title: {
      ar: '﴿ تفسير القرآن الكريم ﴾',
      en: '﴿ Interpretation of the Holy Quran ﴾'
    },
    subTitle: {
      ar: '﴿ ادعوا لنا بالتيسير لإتمام تفسير القرآن كامل بإذن الله ﴾',
      en: '﴿ Pray for us to facilitate completing the full Quran tafseer, God willing ﴾'
    },
    chooseJuz: {
      ar: 'اختر الجزء',
      en: 'Choose Part / Juz'
    },
    fatiha: {
      ar: 'الفاتحة',
      en: 'Al-Fatiha'
    },
    juz30: {
      ar: 'الجزء 30',
      en: 'Juz 30 (Juz Amma)'
    }
  };

  // 👈 2. Injektera LanguageService (public så att HTML kan läsa den)
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    public langService: LanguageService 
  ) {}

  ngOnInit() {
    const currentLang = this.langService.currentLang();

    // Sätter unik titel baserat på språk
    this.titleService.setTitle(
      currentLang === 'en' ? 'Huda & Tadabbur - Holy Quran' : 'هدى وتدبر - القرآن الكريم'
    );
    
    // Uppdaterar meta-beskrivningen
    this.metaService.updateTag({ 
      name: 'description', 
      content: currentLang === 'en' 
        ? 'List of Quran parts and Surahs in Huda & Tadabbur application. Start with Surah Al-Fatiha and Juz Amma.'
        : 'قائمة أجزاء القرآن الكريم وسوره في تطبيق هدى وتدبر. ابدأ بقراءة وتدبر سورة الفاتحة وجزء عمَّ.' 
    });
  }
}