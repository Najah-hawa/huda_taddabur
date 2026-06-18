import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { FawaedOfSurahComponent } from '../../../fawaed-of-surah/fawaed-of-surah.component';
import { NextBeforeSurahMenyComponent } from "../../../next-before-surah-meny/next-before-surah-meny.component";

// Importera data specifikt för Surah 83
import { verses, abassaQuestions, rubtTassweerySections } from './surah83-data';

@Component({
  selector: 'app-surah-83',
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
  templateUrl: './surah-83.component.html',
  styleUrls: ['./surah-83.component.css']
})
export class Surah83Component implements OnInit { // Implementera OnInit

  // Flikstyrning
  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  
  // Toggling av tafsir (lagrar index för öppna verser)
  shown = new Set<number>();
  
  // Håller koll på vilka visuella sektioner som är utfällda
  expandedSections: { [key: number]: boolean } = {};

  // Bind exporterade data till klassmedlemmar för att använda i HTML
  verses = verses;
  abassaQuestions = abassaQuestions;
  rubtTassweerySections = rubtTassweerySections;

  // Injicera Title och Meta i konstruktorn
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätt sidans titel
    this.titleService.setTitle('سورة المطففين - تدبر وفؤائد وتفسير');

    // Sätt meta-taggar för SEO och sociala medier (Open Graph)
    this.metaService.updateTag({ name: 'description', content: 'تدبر وتفسير سورة المطففين، مع بيان عاقبة المطففين وجزاء الأبرار، وفواائد السورة الكريمة مع اختبار تفاعلي.' });
    this.metaService.updateTag({ name: 'keywords', content: 'سورة المطففين, تفسير سورة المطففين, تدبر القرآن, الأبرار, الفجار, المطففين' });
    
    // Open Graph (för delning på t.ex. Facebook/WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: 'سورة المطففين - محور التدبر والتفسير' });
    this.metaService.updateTag({ property: 'og:description', content: 'اكتشف مقاصد سورة المطففين، تفسير الآيات، والفوائد المستخرجة مع وسائل إيضاحية.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
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

  // Ljuduppspelning för specifik vers (Ayah) via EveryAyah API
  playAyah(ayahNum: number) {
    const surahNum = 83; 
    
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