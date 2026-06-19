import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 Hämta strukturerad data specifikt för Hadith 1
import { 
  hadithDetails, 
  hadithImportanceList,
} from './hadith3-data';

@Component({
  selector: 'app-nawawi-3',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './nawawi-3.component.html',
  styleUrl: './nawawi-3.component.css'
})
export class Nawawi3Component implements OnInit, OnDestroy {
  // Koppla lokala variabler till Hadith 1:s datastruktur enligt den nya designen
  hadith = hadithDetails;
  box1Items = hadithImportanceList; 


  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false; 
  currentPhraseIndex: number = -1;

  // Zoomkontroller för helskärmsmoduler (90vh)
  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;
  isRawiMaximized: boolean = false;

  // Kontroller för talsyntesen av förklaringen
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private titleService: Title, private metaService: Meta) {}

ngOnInit() {
    // 🎯 الأوسام والـ Meta-tags المخصصة للحديث الثالث
    this.titleService.setTitle('الحديث الثالث: أركان الإسلام ودعائمه العظام - شروح الأربعين النووية');

    this.metaService.updateTag({ 
      name: 'description', 
      content: 'شرح وتدبر الحديث الثالث من الأربعين النووية (بني الإسلام على خمس)، مع بيان مفصل لأركان الإسلام الخمسة وشروط قبول العبادات وعقوبة ترك الصلاة والزكاة.' 
    });

    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'بني الإسلام على خمس, أركان الإسلام, الحديث الثالث, الأربعون النووية, شهادة أن لا إله إلا الله, إقام الصلاة, إيتاء الزكاة, حج البيت, صوم رمضان, شرح الحديث' 
    });
    
    this.metaService.updateTag({ property: 'og:title', content: 'الحديث الثالث: أركان الإسلام ودعائمه العظام - تدبر تفاعلي' });
    this.metaService.updateTag({ property: 'og:description', content: 'اقرأ واستمع إلى متن الحديث الثالث مع شرح دعائم الإسلام الخمس، أحكام العبادات، وأهم الفوائد التربوية والفقهية المستخرجة.' });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
  }
  // ==========================================
  // Gränssnittskontroller & Zoom
  // ==========================================
  toggleBox1Zoom() {
    this.isBox1Maximized = !this.isBox1Maximized;
    this.cdr.detectChanges();
  }

  toggleBox2Zoom() {
    this.isBox2Maximized = !this.isBox2Maximized;
    this.cdr.detectChanges();
  }

  toggleRawiZoom() {
    this.isRawiMaximized = !this.isRawiMaximized;
    this.cdr.detectChanges();
  }

  toggleExplanation() {
    this.isExplanationShown = !this.isExplanationShown;
  }

  // ==========================================
  // Talsyntes för förklaringsboxen
  // ==========================================
  speakText(text: string | undefined) {
    if (!text) return;

    if (this.isSpeakingTafsir && !this.isTafsirPaused) {
      window.speechSynthesis.pause();
      this.isTafsirPaused = true;
      this.cdr.detectChanges();
      return;
    }

    if (this.isSpeakingTafsir && this.isTafsirPaused) {
      window.speechSynthesis.resume();
      this.isTafsirPaused = false;
      this.cdr.detectChanges();
      return;
    }

    window.speechSynthesis.cancel(); 
    
    const plainText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);

    utterance.lang = 'ar';
    utterance.rate = 0.9;

    utterance.onstart = () => {
      this.isSpeakingTafsir = true;
      this.isTafsirPaused = false;
      this.cdr.detectChanges();
    };

    utterance.onend = () => {
      this.stopSpeakingTafsir();
    };

    utterance.onerror = (event) => {
      console.error("حدث خطأ في القراءة الصوتية:", event.error);
      this.stopSpeakingTafsir();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeakingTafsir() {
    window.speechSynthesis.cancel();
    this.isSpeakingTafsir = false;
    this.isTafsirPaused = false;
    this.cdr.detectChanges();
  }

  // ==========================================
  // Synkroniserat ljudspår för själva texten
  // ==========================================
  playHadithAudio(url: string | undefined) {
    if (!url) return;
    
    if (this.currentAudio && this.isPlaying) { 
      this.currentAudio.pause(); 
      this.isPlaying = false; 
      this.cdr.detectChanges(); 
      return; 
    }
    
    if (this.currentAudio && !this.isPlaying) { 
      this.isPlaying = true; 
      this.cdr.detectChanges(); 
      this.currentAudio.play().catch(() => this.isPlaying = false); 
      return; 
    }
    
    window.speechSynthesis.cancel();
    this.currentAudio = new Audio(url);
    this.isPlaying = true;
    this.cdr.detectChanges();
    
    this.currentAudio.ontimeupdate = () => {
      if (!this.currentAudio) return;
      const currentTime = this.currentAudio.currentTime;
      const index = this.hadith.phrases.findIndex(p => currentTime >= p.start && currentTime < p.end);
      if (index !== this.currentPhraseIndex) { 
        this.currentPhraseIndex = index; 
        this.cdr.detectChanges(); 
      }
    };
    
    this.currentAudio.play()
      .then(() => this.cdr.detectChanges())
      .catch(() => this.isPlaying = false);
      
    this.currentAudio.onended = () => { 
      this.isPlaying = false; 
      this.currentPhraseIndex = -1; 
      this.currentAudio = null; 
      this.cdr.detectChanges(); 
    };
  }

  ngOnDestroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }
}