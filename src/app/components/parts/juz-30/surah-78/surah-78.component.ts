import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { CommonModule } from '@angular/common'; 
import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { FawaedOfSurahComponent } from '../../../fawaed-of-surah/fawaed-of-surah.component';
import { verses, alnabbaQuestions, rubtTassweerySections } from './surah78-data';
import { RouterModule } from '@angular/router';
import { NextBeforeSurahMenyComponent } from "../../../next-before-surah-meny/next-before-surah-meny.component";
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera Title och Meta

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
    FooterInfoComponent,
    FawaedOfSurahComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './surah-78.component.html',
  styleUrl: './surah-78.component.css'
})
export class Surah78Component implements OnInit {

  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  shown = new Set<number>();
  expandedSections: { [key: number]: boolean } = {};

  verses = verses;
  alnabbaQuestions = alnabbaQuestions;
  rubtTassweerySections = rubtTassweerySections;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Dynamisk SEO-titel för webbläsarfliken
    this.titleService.setTitle('هدى وتدبر - سورة النبأ (تفسير وتدبر)');
    
    // Dynamisk Meta-beskrivning för Google-sökningar
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تدبر وتفسير سورة النبأ من تفسير ابن كثير. استمع إلى الآيات الكريمة وقراءتها الصوتية، واكتشف الخريطة الذهنية البصرية وفوائد السورة.' 
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
    const surahNum = 78; // 👈 سورة النبأ ثابتة وصحيحة هنا
    
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