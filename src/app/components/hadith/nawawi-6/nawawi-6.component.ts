import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; // 👈 استيراد HttpClient لتنزيل الملف بالكامل
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 Hämta strukturerad data specifikt för Hadith 6
import { 
  hadithDetails, 
  hadithImportanceList,
  hadithFawaedList,
  hadithFawaed1,
  hadithFawaed2
} from './hadith6-data';

@Component({
  selector: 'app-nawawi-6',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './nawawi-6.component.html',
  styleUrl: './nawawi-6.component.css'
})
export class Nawawi6Component implements OnInit, OnDestroy {
  // 👈 حقن خدمة HttpClient باستخدام inject
  private http = inject(HttpClient);

  // Koppla lokala variabler till Hadith 6:s datastruktur
  hadith = hadithDetails;
  box1Items = hadithImportanceList; 
  box2Items = hadithFawaedList;    
  box3Items =  hadithFawaed1;
  box4Items = hadithFawaed2;  

  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false; 
  currentPhraseIndex: number = -1;

  // Zoomkontroller för helskärmsmoduler
  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;
  isBox3Maximized: boolean = false;
  isBox4Maximized: boolean = false;
  isRawiMaximized: boolean = false;

  // Kontroller för talsyntesen av förklaringen
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // 🎯 الأوزان الفريدة وعناوين Meta المقترحة والمتوافقة مع السيو للحديث السادس
    this.titleService.setTitle('الحديث السادس: إن الحلال بين وإن الحرام بين - شروح الأربعين النووية');

    this.metaService.updateTag({ 
      name: 'description', 
      content: 'شرح وتدبر الحديث السادس من الأربعين النووية (الحلال والحرام والمشتبهات)، مع بيان أثر أكل الحلال على صلاح القلب وأقوال الفقهاء في الشبهات.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'الحلال والحرام, المشتبهات, الحديث السادس, الأربعون النووية, النعمان بن بشير, صلاح القلب, اتقاء الشبهات, شرح الحديث' 
    });
    
    this.metaService.updateTag({ property: 'og:title', content: 'الحديث السادس: إن الحلال بين وإن الحرام بين - تدبر تفاعلي' });
    this.metaService.updateTag({ property: 'og:description', content: 'اقرأ واستمع إلى متن الحديث السادس مع الشرح الصوتي، تفسير المفردات الغامضة، وأبرز الفوائد عن مغذيات القلب وصلاحه.' });
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

   toggleBox3Zoom() {
    this.isBox3Maximized = !this.isBox3Maximized;
    this.cdr.detectChanges();
  }
   toggleBox4Zoom() {
    this.isBox4Maximized = !this.isBox4Maximized;
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

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const localBlobUrl = URL.createObjectURL(blob);
        
        this.currentAudio = new Audio(localBlobUrl);
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
      },
      error: (err) => {
        console.error("خطأ في جلب ملف الصوت؛ قد يكون المستخدم أوف لاين ولم يخزن هذا الملف مسبقاً:", err);
        this.isPlaying = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }
}