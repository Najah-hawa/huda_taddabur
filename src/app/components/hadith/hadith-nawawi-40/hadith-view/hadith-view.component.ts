import { Component, Input, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../../zoom-controls/zoom-controls.component';
import { NextBeforeSurahMenyComponent } from '../../../next-before-surah-meny/next-before-surah-meny.component';
import { ProvComponent } from '../../prov/prov.component';

@Component({
  selector: 'app-hadith-view',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SurahHintComponent, 
    FooterInfoComponent, 
    NextBeforeSurahMenyComponent, 
    ZoomControlsComponent, 
    ProvComponent
  ],
  templateUrl: './hadith-view.component.html',
  styleUrls: ['./hadith-view.component.css']
})
export class HadithViewComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // ==================== Inputs استقبال البيانات ====================
  @Input() title: string = '';
  @Input() name: string = '';
  @Input() hintText: string = '';
  @Input() audioUrl: string = '';
  @Input() phrases: { text: string; start: number; end: number }[] = [];
  @Input() explanation: string = '';
  @Input() source: string = 'متن الأربعين النووية';
 // الصندوق 1 (موجود سابقاً)
  @Input() box1Title: string = '';
  @Input() box1Items: string[] = [];
  // الصندوق 2
  @Input() box2Title: string = '';
  @Input() box2Items: string[] = [];
  // الصندوق 3
  @Input() box3Title: string = '';
  @Input() box3Items: string[] = [];
  // الصندوق 4
  @Input() box4Title: string = '';
  @Input() box4Items: string[] = [];
  @Input() quizQuestions: any;
  // روابط القائمة والتنقل
  @Input() routeBefore: string = '/home';
  @Input() surahBefore: string = 'القائمة الرئيسية';
  @Input() routeAfter: string = '';
  @Input() surahNext: string = '';

  // السيو المخصص بكل حديث
  @Input() metaDescription: string = '';
  @Input() metaKeywords: string = '';

  // ==================== متغيرات الحالة الداخلية ====================
  fontSizeRawi: number = window.innerWidth < 600 ? 14 : 20;
  fontSizeBox1: number = 16;
  fontSizeBox2: number = 16;
  fontSizeBox3: number = 16;
  fontSizeBox4: number = 16;
  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  isLoadingAudio = false; 
  currentPhraseIndex: number = -1;
  currentTime: number = 0;
  duration: number = 0;
  maximizedBoxes: { [key: number]: boolean } = { 1: false, 2: false, 3: false, 4: false };
  isRawiMaximized: boolean = false;
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;
  showQuizHadith = false;

  ngOnInit() {
    // إعداد الـ Meta Tags ديناميكياً بناءً على الـ Inputs المتلقاة
    this.titleService.setTitle(`${this.name} - شرح ${this.title}`);
    if (this.metaDescription) {
      this.metaService.updateTag({ name: 'description', content: this.metaDescription });
      this.metaService.updateTag({ property: 'og:description', content: this.metaDescription });
    }
    if (this.metaKeywords) {
      this.metaService.updateTag({ name: 'keywords', content: this.metaKeywords });
    }
    this.metaService.updateTag({ property: 'og:title', content: `${this.name} - تدبر تفاعلي` });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
  }

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

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    this.isLoadingAudio = true; 
    this.cdr.detectChanges();

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const localBlobUrl = URL.createObjectURL(blob);
        this.currentAudio = new Audio(localBlobUrl);
        this.isPlaying = true;
        this.isLoadingAudio = false; 
        this.cdr.detectChanges();

        this.currentAudio.onloadedmetadata = () => {
          if (this.currentAudio) {
            this.duration = this.currentAudio.duration;
            this.cdr.detectChanges();
          }
        };
        
        this.currentAudio.ontimeupdate = () => {
          if (!this.currentAudio) return;
          this.currentTime = this.currentAudio.currentTime;

          const index = this.phrases.findIndex(p => this.currentTime >= p.start && this.currentTime < p.end);
          if (index !== this.currentPhraseIndex) {
            this.currentPhraseIndex = index;
          }
          this.cdr.detectChanges();
        };
        
        this.currentAudio.play()
          .then(() => this.cdr.detectChanges())
          .catch(() => {
            this.isPlaying = false;
            this.cdr.detectChanges();
          });
          
        this.currentAudio.onended = () => {
          this.isPlaying = false;
          this.currentTime = 0;
          this.currentPhraseIndex = -1;
          this.currentAudio = null;
          this.cdr.detectChanges();
        };
      },
      error: (err) => {
        console.error("خطأ في جلب ملف الصوت؛ قد يكون المستخدم أوف لاين:", err);
        this.isLoadingAudio = false; 
        this.isPlaying = false;
        this.cdr.detectChanges();
      }
    });
  }

  skipToNextPhrase() {
    if (!this.currentAudio || !this.phrases) return;
    const nextIndex = this.currentPhraseIndex + 1;
    if (nextIndex >= 0 && nextIndex < this.phrases.length) {
      this.currentAudio.currentTime = this.phrases[nextIndex].start;
      this.currentTime = this.currentAudio.currentTime;
      this.cdr.detectChanges();
    }
  }

  skipToPreviousPhrase() {
    if (!this.currentAudio || !this.phrases) return;
    if (this.currentPhraseIndex === -1) {
      this.currentAudio.currentTime = 0;
      return;
    }
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    const progressInPhrase = this.currentAudio.currentTime - currentPhrase.start;

    if (progressInPhrase > 2) {
      this.currentAudio.currentTime = currentPhrase.start;
    } else if (this.currentPhraseIndex > 0) {
      const prevPhrase = this.phrases[this.currentPhraseIndex - 1];
      this.currentAudio.currentTime = prevPhrase.start;
    } else {
      this.currentAudio.currentTime = 0;
    }
    this.currentTime = this.currentAudio.currentTime;
    this.cdr.detectChanges();
  }

  onSliderChange(event: any) {
    if (this.currentAudio) {
      this.currentAudio.currentTime = Number(event.target.value);
      this.currentTime = this.currentAudio.currentTime;
      this.cdr.detectChanges();
    }
  }

  toggleRawiZoom(boxElement: HTMLElement) {
    this.isRawiMaximized = !this.isRawiMaximized;
    if (!this.isRawiMaximized) {
      this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
      this.isExplanationShown = false;
    }
    document.body.style.overflow = this.isRawiMaximized ? 'hidden' : 'auto';
    this.cdr.detectChanges();
    setTimeout(() => {
      if (boxElement) boxElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); 
  }

  zoomInRawi() {
    if (this.fontSizeRawi < 36) { this.fontSizeRawi += 2; this.cdr.detectChanges(); }
  }
  zoomOutRawi() {
    if (this.fontSizeRawi > 12) { this.fontSizeRawi -= 2; this.cdr.detectChanges(); }
  }

// تحديث دالة التكبير لتأخذ رقم الصندوق والعنصر الخاص به
// 3. دالة تبديل وضع التكبير الموحدة المتوافقة مع ستايلك
toggleBoxZoom(boxNumber: number, boxElement: HTMLElement) {
  this.maximizedBoxes[boxNumber] = !this.maximizedBoxes[boxNumber];

  const isAnyBoxMaximized = Object.values(this.maximizedBoxes).some(val => val === true);
  document.body.style.overflow = isAnyBoxMaximized ? 'hidden' : 'auto';

  if (!this.maximizedBoxes[boxNumber]) {
    // إعادة تعيين الخط الافتراضي عند الخروج من التكبير
    if (boxNumber === 1) { this.fontSizeBox1 = 16; this.applyFontChangeDirect(boxElement, this.fontSizeBox1); }
    if (boxNumber === 2) { this.fontSizeBox2 = 16; this.applyFontChangeDirect(boxElement, this.fontSizeBox2); }
    if (boxNumber === 3) { this.fontSizeBox3 = 16; this.applyFontChangeDirect(boxElement, this.fontSizeBox3); }
    if (boxNumber === 4) { this.fontSizeBox4 = 16; this.applyFontChangeDirect(boxElement, this.fontSizeBox4); }
  }

  this.cdr.detectChanges();
  setTimeout(() => {
    if (boxElement) boxElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

// 4. دالات التكبير والتصغير المستقلة للصناديق
zoomInBox1(el: HTMLElement) { if (this.fontSizeBox1 < 36) { this.fontSizeBox1 += 2; this.applyFontChangeDirect(el, this.fontSizeBox1); } }
zoomOutBox1(el: HTMLElement) { if (this.fontSizeBox1 > 14) { this.fontSizeBox1 -= 2; this.applyFontChangeDirect(el, this.fontSizeBox1); } }

zoomInBox2(el: HTMLElement) { if (this.fontSizeBox2 < 36) { this.fontSizeBox2 += 2; this.applyFontChangeDirect(el, this.fontSizeBox2); } }
zoomOutBox2(el: HTMLElement) { if (this.fontSizeBox2 > 14) { this.fontSizeBox2 -= 2; this.applyFontChangeDirect(el, this.fontSizeBox2); } }

zoomInBox3(el: HTMLElement) { if (this.fontSizeBox3 < 36) { this.fontSizeBox3 += 2; this.applyFontChangeDirect(el, this.fontSizeBox3); } }
zoomOutBox3(el: HTMLElement) { if (this.fontSizeBox3 > 14) { this.fontSizeBox3 -= 2; this.applyFontChangeDirect(el, this.fontSizeBox3); } }

zoomInBox4(el: HTMLElement) { if (this.fontSizeBox4 < 36) { this.fontSizeBox4 += 2; this.applyFontChangeDirect(el, this.fontSizeBox4); } }
zoomOutBox4(el: HTMLElement) { if (this.fontSizeBox4 > 14) { this.fontSizeBox4 -= 2; this.applyFontChangeDirect(el, this.fontSizeBox4); } }

private applyFontChangeDirect(element: HTMLElement, size: number) {
  if (element) {
    element.style.setProperty('--dynamic-font-size', `${size}px`);
    this.cdr.detectChanges();
  }
}

//زر فتح/إغلاق شرح المفردات 
  toggleExplanation() { this.isExplanationShown = !this.isExplanationShown; }

  speakText(text: string | undefined) {
    if (!text) return;

      // 1. فحص الأمان: إذا كان المتصفح لا يدعم ميزة تحويل النص إلى كلام، اخرج فوراً لمنع الانهيار
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
          // يمكنك هنا إظهار رسالة تنبيه للمستخدم إن أحببتِ، مثل: alert("الميزة غير مدعومة في متصفحك")
      console.warn("الميزة غير مدعومة في هذا الجهاز.");
      return; 
    }

      // الآن كل الأسطر بالأسفل ستعمل بأمان لأننا تأكدنا من دعم المتصفح لها 100%
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
    utterance.onstart = () => { this.isSpeakingTafsir = true; this.isTafsirPaused = false; this.cdr.detectChanges(); };
    utterance.onend = () => { this.stopSpeakingTafsir(); };
    utterance.onerror = () => { this.stopSpeakingTafsir(); };
    window.speechSynthesis.speak(utterance);
  }

  stopSpeakingTafsir() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) { window.speechSynthesis.cancel(); }
    this.isSpeakingTafsir = false; this.isTafsirPaused = false; this.cdr.detectChanges();
  }

  closeExplanationAndScroll(targetElement: HTMLElement) {
    this.isExplanationShown = false;
    this.stopSpeakingTafsir();
    this.cdr.detectChanges();
    setTimeout(() => { targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50); 
  }

  startHadithQuiz() { this.showQuizHadith = true; }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    if (this.currentAudio) { this.currentAudio.pause(); this.currentAudio = null; }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) { window.speechSynthesis.cancel(); }
  }
}