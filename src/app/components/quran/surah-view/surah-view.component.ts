import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { RouterModule,ActivatedRoute, Router, Params} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera Title och Meta
import { SurahHintComponent } from "../../shared/surah-hint/surah-hint.component";
import { SurahsStartComponent } from '../quran_shared_components/surahs-start/surahs-start.component';
import { SurahTabsComponent } from "../quran_shared_components/surah-tabs/surah-tabs.component"; 
import { QuixTafserComponent } from '../quran_shared_components/quix-tafser/quix-tafser.component';
import { FawaedOfSurahComponent } from '../quran_shared_components/fawaed-of-surah/fawaed-of-surah.component';
import { FooterInfoComponent } from '../../shared/footer-info/footer-info.component';
import { NezzolComponent } from '../quran_shared_components/nezzol/nezzol.component';
import { NextBeforeSurahMenyComponent } from "../../shared/next-before-surah-meny/next-before-surah-meny.component";
import { SURAH_ORDER, SURAH_REGISTRY} from './surah-registry'; // Eller vad din registry-fil heter
import { LanguageService } from '../../../services/language.service'; 
// 🌟 Skapa typen direkt i komponenten:
export type Language = 'ar' | 'en';
@Component({
  selector: 'app-surah-view',
  imports: [
    RouterModule, 
    SurahHintComponent, 
    SurahsStartComponent, 
    SurahTabsComponent, 
    CommonModule, 
    FawaedOfSurahComponent, 
    NezzolComponent, 
    QuixTafserComponent, 
    FooterInfoComponent, 
    NextBeforeSurahMenyComponent 
  ],
  templateUrl: './surah-view.component.html',
  styleUrl: './surah-view.component.css'
})
export class SurahViewComponent implements OnInit {

  // UI-översättningar för hela Surah-vyn
  public uiText = {
    chooseSurahPrompt: {
      ar: 'اختر السورة للبدء في القراءة والتدبر:',
      en: 'Choose a Surah to start reading and reflecting:'
    },
    upcomingSurahsNotice: {
      ar: '﴿قريبا سوف نكمل تنزيل باقي السور ادعوا لنا بالتيسير﴾',
      en: '﴿More Surahs will be added soon. Please keep us in your prayers﴾'
    },
    surahPrefix: {
      ar: 'سورة ',
      en: 'Surah '
    },
    listenTafseer: {
      ar: '🔊 استمع للتفسير',
      en: '🔊 Listen to Tafseer'
    },
    summaryTitle: {
      ar: 'ملخص السورة:',
      en: 'Surah Summary:'
    },
    tafseerSourcePrefix: {
      ar: '📚 مصدر التفسير: ',
      en: '📚 Tafseer Source: '
    },
    defaultBenefitTitle: {
      ar: 'فائدة:',
      en: 'Benefit:'
    },
    defaultReminderTitle: {
      ar: 'تذكير:',
      en: 'Reminder:'
    },
    defaultHadithSummary: {
      ar: '📜 عرض الحديث',
      en: '📜 View Hadith'
    }
  }; 
  


  // Hämtar rätt rubrik för Benefit ("فائدة" eller "Benefit:")
getBenefitTitle(): string {
  const isEn = this.langService.currentLang() === 'en';
  if (isEn) {
    return 'Benefit:';
  }
  return this.surahData?.benefit?.title || 'فائدة:';
}

// Hämtar rätt rubrik för Reminder ("تذكير" eller "Reminder:")
getReminderTitle(): string {
  const isEn = this.langService.currentLang() === 'en';
  if (isEn) {
    return 'Reminder:';
  }
  return this.surahData?.reminder?.title || 'تذكير:';
}

// Hämtar rätt rubrik för Hadith-länken ("📜 عرض الحديث" eller "📜 View Hadith")
getHadithSummary(): string {
  const isEn = this.langService.currentLang() === 'en';
  if (isEn) {
    return '📜 View Hadith';
  }
  return this.surahData?.reminder?.hadithSummary || '📜 عرض الحديث';
}



  surahData: any = null;

// 🌟 Nya variabler för meny-vyn
  isCategoryView = false;
  categoryTitle = '';
  categorySurahs: any[] = [];

// Navigationsdata
  prevSurah = { name: '', route: '' };
  nextSurah = { name: '', route: '' };

  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  shown = new Set<number>();
  expandedSections: { [key: number]: boolean } = {};
    

 // alfatihaQuestions = alfatihaQuestions;
 // rubtTassweerySections = rubtTassweerySections;
  constructor(private route: ActivatedRoute, private router: Router,  public langService: LanguageService) {}
ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    // 1. Skriv ut parametrarna i konsolen så att du ser vad Angular tar emot
    console.log('SurahView Params:', params);

    // 2. Leta efter språket i 'lang' ELLER 'id' (om URL:en /surah/alfatiha/en saknar :id)
    let rawLang = params['lang'] as string;
    
    // Om 'lang' är undefined men 'id' är 'en' eller 'ar', använd 'id' som språk
    if (!rawLang && (params['id'] === 'en' || params['id'] === 'ar')) {
      rawLang = params['id'];
    }

    const lang: Language = (rawLang === 'en' || rawLang === 'ar') ? rawLang : 'ar';

    // 3. Hämta category och id
    const category = params['category'] as string;
    // Om id användes som språk sätter vi id till tom sträng ''
    const id = (params['id'] === 'en' || params['id'] === 'ar') ? '' : (params['id'] as string);

    // 4. Synka med LanguageService
    if (this.langService.currentLang() !== lang) {
      this.langService.setLanguage(lang);
    }

    // 5. Hämta kategoriobjektet från registryt
    const categoryObj = SURAH_REGISTRY[category];

    if (categoryObj) {
      const rawData = id ? categoryObj.data?.[id] : categoryObj.data;

      if (rawData) {
        const langSpecificData = rawData[lang] || rawData;

        if (id || (langSpecificData && langSpecificData.verses)) {
          this.isCategoryView = false;
          this.surahData = langSpecificData;
          this.calculateNavigation(category, id || '', lang);
        } else {
          this.setupCategoryView(categoryObj, category, lang);
        }
      } else {
        this.setupCategoryView(categoryObj, category, lang);
      }
    } else {
      this.isCategoryView = false;
      this.surahData = null;
    }
  });
}
  private setupCategoryView(categoryObj: any, category: string, lang: Language): void {
    this.isCategoryView = true;
    
    // Hantera om title är ett objekt { ar: '...', en: '...' } eller en vanlig sträng
    if (typeof categoryObj.title === 'object') {
      this.categoryTitle = categoryObj.title[lang] || categoryObj.title['ar'];
    } else {
      this.categoryTitle = categoryObj.title;
    }

    this.categorySurahs = SURAH_ORDER.filter(item => item.category === category);
  }

  // 🌟 Hjälpmetod för att byta språk i URL när användaren klickar på språkväljaren
  switchLanguageInUrl(newLang: Language): void {
    const currentUrl = this.router.url;
    // Ersätt /ar/ med /en/ eller tvärtom i URL:en
    const updatedUrl = currentUrl.replace(/^\/(ar|en)/, `/${newLang}`);
    this.router.navigateByUrl(updatedUrl);
  }

  private calculateNavigation(category: string, id: string, lang: Language): void {
    // Hitta nuvarande suras index i listan
    const currentKey = id ? id : category;
    const currentIndex = SURAH_ORDER.findIndex(item => item.key === currentKey);

    if (currentIndex !== -1) {
      // ⏪ Föregående sura (om vi är på 0/Alfatiha går vi till den sista)
      const prevIndex = currentIndex === 0 ? SURAH_ORDER.length - 1 : currentIndex - 1;
      const prevItem = SURAH_ORDER[prevIndex];
      this.prevSurah = {
        name: prevItem.name,
        route: prevItem.category === 'alfatiha' ? '/surah/alfatiha' : `/surah/${prevItem.category}/${prevItem.key}`
      };

      // ⏩ Nästa sura (om vi är på sista går vi till 0/Alfatiha)
      const nextIndex = currentIndex === SURAH_ORDER.length - 1 ? 0 : currentIndex + 1;
      const nextItem = SURAH_ORDER[nextIndex];
      this.nextSurah = {
        name: nextItem.name,
        route: nextItem.category === 'alfatiha' ? '/surah/alfatiha' : `/surah/${nextItem.category}/${nextItem.key}`
      };
    }
  }

// Hjälpmetod för dynamisk länk i menyn
  getSurahRoute(surah: any): string {
    return surah.category === 'alfatiha' ? '/surah/alfatiha' : `/surah/${surah.category}/${surah.key}`;
  }

  toggleExpanded(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
    
  onTabChange(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
  }
    
getVerseText(number: number): string {
  // التأكد من وجود البيانات والآيات داخل السورة الحالية
  if (!this.surahData || !this.surahData.verses) {
    return '';
  }

  // 🌟 إضافة (v: any) حل مشكلة Parameter 'v' implicitly has an 'any' type
  const verse = this.surahData.verses.find((v: any) => v.number === number);
  
  return verse ? `${verse.text} ﴿${verse.number}﴾` : '';
}
      
  toggleVerse(index: number) {
    if (this.shown.has(index)) {
      this.shown.clear(); 
    } else {
      this.shown.clear(); 
      this.shown.add(index); 
    }
  }
    
  speakTafseer(text: string | undefined) {
    if (!text) return;
    window.speechSynthesis.cancel();
    const plainText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'ar';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
  
  playAyah(ayahNum: number) {
    // 💡 KOMMENTAR FIX: Här stod det "سورة المطففين" i din kommentar, 
    // men eftersom detta är Al-Fatiha ska surahNum vara 1, vilket du har satt helt rätt!
    const surahNum = 1; 
    
    const formattedSurah = String(surahNum).padStart(3, '0');
    const formattedAyah = String(ayahNum).padStart(3, '0');
    
    const audioUrl = `https://www.everyayah.com/data/Ayman_Sowaid_64kbps/${formattedSurah}${formattedAyah}.mp3`;
    
    window.speechSynthesis.cancel(); 
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error("خطأ في التشغيل:", error);
    });
  }


  // Hjälpmetod för att få Surah-namn på rätt språk
  getSurahName(surah: any): string {
    const isEn = this.langService.currentLang() === 'en';
    // Om din surah-data har ett engelskt namn (t.ex. surah.englishName) använder vi det
    if (isEn && surah.englishName) {
      return surah.englishName;
    }
    return surah.name;
  }
}