import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
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
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const category = params['category'] as string; // t.ex. 'alfatiha' eller 'juz-30'
      const id = params['id']as string;         // t.ex. 'surah-78'
      
      // Hämta kategoriobjektet från registryt
      const categoryObj = SURAH_REGISTRY[category];
    if (categoryObj) {
      if (id) {
        // 1. Om vi har ett specifikt id (t.ex. /surah/juz-30/surah-78) -> Sura-detaljvy
        this.isCategoryView = false;
        this.surahData = categoryObj.data?.[id];
        this.calculateNavigation(category, id);

      } else if (categoryObj.data && categoryObj.data.verses) {
        // 2. 🌟 Om det inte finns något id ELLER om datan i kategorin DIREKT innehåller 'verses' (som Al-Fatiha) -> Sura-detaljvy!
        this.isCategoryView = false;
        this.surahData = categoryObj.data;
        this.calculateNavigation(category, '');

      } else {
        // 3. Om det är en hel samling/Juz utan enskilt id (t.ex. /surah/juz-30) -> Kategori/Meny-vy
        this.isCategoryView = true;
        this.categoryTitle = categoryObj.title;
        this.categorySurahs = SURAH_ORDER.filter(item => item.category === category);
      }
    } else {
      this.isCategoryView = false;
      this.surahData = null;
    }
  });
}

  private calculateNavigation(category: string, id: string): void {
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
}