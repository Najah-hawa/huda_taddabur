import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

import { SurahHintComponent } from '../../../../shared/surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../../quran/surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../../quran/surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../../quran/quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../../shared/footer-info/footer-info.component';
import { FawaedOfSurahComponent } from '../../../../quran/fawaed-of-surah/fawaed-of-surah.component';
import { NextBeforeSurahMenyComponent } from "../../../../shared/next-before-surah-meny/next-before-surah-meny.component";

// Importera data specifikt för Surah 84
import { verses, burujQuestions, rubtTassweerySections } from './surah85-data';

@Component({
  selector: 'app-surah-84',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SurahHintComponent,
    SurahsStartComponent,
    SurahTabsComponent,
    QuixTafserComponent,
    FooterInfoComponent,
    FawaedOfSurahComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './surah-85.component.html',
  styleUrl: './surah-85.component.css'
})
export class Surah85Component implements OnInit { // Implementera OnInit

  // Flikstyrning
  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  
  // Toggling av tafsir (lagrar index för öppna verser)
  shown = new Set<number>();
  
  // Håller koll på vilka sektioner som är utfällda
  expandedSections: { [key: number]: boolean } = {};

  // Bind exporterade data till klassmedlemmar för HTML-användning
  verses = verses;
  burujQuestions = burujQuestions;
  rubtTassweerySections = rubtTassweerySections;

  // Injicera Title- och Meta-tjänsterna
  constructor(private titleService: Title, private metaService: Meta) {}
ngOnInit() {
  // Sätt sidans titel för SEO
  this.titleService.setTitle('سورة البروج - تدبر، تفسير وفوائد رقمية');

  // Sätt meta-taggar för sökmotorer
  this.metaService.updateTag({ 
    name: 'description', 
    content: 'تدبر وتفسير سورة البروج، مع تسليط الضوء على قصة أصحاب الأخدود والثبات على الدين، وبيان شروط التوبة النصوح وعظمة بطش الله وجزائه العادل.' 
  });
  
  this.metaService.updateTag({ 
    name: 'keywords', 
    content: 'سورة البروج, تفسير سورة البروج, أصحاب الأخدود, شروط التوبة, تدبر القرآن الكريم, الثبات على الحق, لوح محفوظ' 
  });
  
  // Open Graph (för optimal delning på WhatsApp/Sociala medier)
  this.metaService.updateTag({ 
    property: 'og:title', 
    content: 'سورة البروج - محور التدبر والتفسير التفاعلي' 
  });
  
  this.metaService.updateTag({ 
    property: 'og:description', 
    content: 'اكتشف مقاصد سورة البروج التفسيرية، مع إيضاحات حول قصة أصحاب الأخدود وعبر الثبات واليقين في مواجهة الابتلاءات.' 
  });
  
  this.metaService.updateTag({ 
    property: 'og:type', 
    type: 'website' 
  });
}

  // Toggla visning av extra verser i den visuella tidslinjen
  toggleExpanded(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
  
  // Uppdatera aktiv flik
  onTabChange(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
  }

  // Sök fram versens text baserat på versnummer
  getVerseText(number: number): string {
    const verse = this.verses.find(v => v.number === number);
    return verse ? verse.text : '';
  }
  
  // Visa eller dölj tafsir för en specifik vers (stänger andra automatiskt)
  toggleVerse(index: number) {
    if (this.shown.has(index)) {
      this.shown.clear(); 
    } else {
      this.shown.clear(); 
      this.shown.add(index); 
    }
  }

  // Talsyntes för Tafsir-texten
  speakTafseer(text: string | undefined) {
    if (!text) return;
    
    window.speechSynthesis.cancel();
    const plainText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);

    utterance.lang = 'ar';
    utterance.rate = 0.9;
    
    utterance.onerror = (event) => {
      console.error("حدث خطأ في القراءة الصوتية:", event.error);
    };
    window.speechSynthesis.speak(utterance);
  }

  // Ljuduppspelning för specifik vers via EveryAyah API
  playAyah(ayahNum: number) {
    const surahNum = 85; // Uppdaterat till rätt surah-nummer (84)
    
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