import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera Title och Meta
import { SurahHintComponent } from "../../shared/surah-hint/surah-hint.component";
import { SurahsStartComponent } from '../surahs-start/surahs-start.component';
import { SurahTabsComponent } from "../surah-tabs/surah-tabs.component"; 
import { QuixTafserComponent } from '../quix-tafser/quix-tafser.component';
import { FawaedOfSurahComponent } from '../fawaed-of-surah/fawaed-of-surah.component';
import { verses, alfatihaQuestions, rubtTassweerySections } from './alfatiha-data';
import { FooterInfoComponent } from '../../shared/footer-info/footer-info.component';
import { NezzolComponent } from '../nezzol/nezzol.component';
import { NextBeforeSurahMenyComponent } from "../../shared/next-before-surah-meny/next-before-surah-meny.component";

@Component({
  selector: 'app-alfatiha',
  standalone: true,
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
  templateUrl: './alfatiha.component.html',
  styleUrl: './alfatiha.component.css'
})
export class AlfatihaComponent implements OnInit { // 👈 Lägg till implements OnInit

  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  shown = new Set<number>();
  expandedSections: { [key: number]: boolean } = {};
    
  verses = verses;
  alfatihaQuestions = alfatihaQuestions;
  rubtTassweerySections = rubtTassweerySections;

  // 👈 Injicera Title och Meta i constructorn
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätter sidans unika titel
    this.titleService.setTitle('هدى وتدبر - سورة الفاتحة (تفسير وتدبر)');
    
    // Uppdaterar meta-beskrivningen specifikt för sökresultat
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تفسير وتدبر سورة الفاتحة (السبع المثاني) من تفسير ابن كثير، مع استماع للآيات الكريمات، فوائد السورة، ومقاصدها الشريفة.' 
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