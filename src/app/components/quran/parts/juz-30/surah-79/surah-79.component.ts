import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { CommonModule } from '@angular/common'; 
import { SurahHintComponent } from '../../../../shared/surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../../quran/surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../../quran/surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../../quran/quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../../shared/footer-info/footer-info.component';
import { FawaedOfSurahComponent } from '../../../../quran/fawaed-of-surah/fawaed-of-surah.component';
import { verses, alnaziatQuestions, rubtTassweerySections } from './surah79-data';
import { RouterModule } from '@angular/router';
import { NextBeforeSurahMenyComponent } from "../../../../shared/next-before-surah-meny/next-before-surah-meny.component";
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera Title och Meta

@Component({
  selector: 'app-surah-79',
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
  templateUrl: './surah-79.component.html',
  styleUrls: ['./surah-79.component.css']
})
export class Surah79Component implements OnInit {

  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  shown = new Set<number>();
  expandedSections: { [key: number]: boolean } = {};

  verses = verses;
  alnaziatQuestions = alnaziatQuestions;
  rubtTassweerySections = rubtTassweerySections;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Dynamisk SEO-titel för webbläsarfliken
    this.titleService.setTitle('هدى وتدبر - سورة النازعات (تفسير وتدبر)');
    
    // Dynamisk Meta-beskrivning för sökmotorer
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تدبر وتفسير سورة النازعات من تفسير ابن كثير والسعدي وابن عثيمين. استمع إلى الآيات الكريمة واكتشف الخريطة الذهنية البصرية وفوائد السورة العظيمة.' 
    });
  }
   
  toggleExpanded(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
   
  onTabChange(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
  }

  getVerseText(number: number): string {
    const verse = this.verses.find(v => v.number === number);
    return verse ? verse.text : '';
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
    
    utterance.onerror = (event) => {
      console.error("حدث خطأ في القراءة الصوتية:", event.error);
    };
    window.speechSynthesis.speak(utterance);
  }

  playAyah(ayahNum: number) {
    const surahNum = 79; // 👈 سورة النازعات ثابته وصحيحة
    
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