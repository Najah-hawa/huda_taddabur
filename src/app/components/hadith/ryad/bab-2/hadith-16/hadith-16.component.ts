import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; 
import { FooterInfoComponent } from '../../../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../../../zoom-controls/zoom-controls.component';
import { NextBeforeSurahMenyComponent } from "../../../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 Hämta strukturerad data specifikt för Hadith 6
import { hadithDetails, hadithImportanceList} from './hadith16-data';

@Component({
  selector: 'app-hadith-16',
  standalone: true,
  imports: [ CommonModule, RouterModule, FooterInfoComponent, NextBeforeSurahMenyComponent, ZoomControlsComponent ],
  templateUrl: './hadith-16.component.html',
  styleUrl: './hadith-16.component.css'
})

export class Hadith16Component implements OnInit, OnDestroy {

  private http = inject(HttpClient);

  hadith = hadithDetails;
  box1Items = hadithImportanceList;

  fontSizeRawi: number = window.innerWidth < 600 ? 14 : 20;
  fontSizeBox1: number = 16;
  fontSizeBox2: number = 16;


  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  isLoadingAudio = false; 
  currentPhraseIndex: number = -1;

  // 🎵 متغيرات المشغل الصوتي المطور (Audio Player)
  currentTime: number = 0;
  duration: number = 0;

  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;
  isBox3Maximized: boolean = false;
  isBox4Maximized: boolean = false;
  isRawiMaximized: boolean = false;

  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private titleService: Title, private metaService: Meta) {}
ngOnInit() {
  // تعيين عنوان الصفحة
  this.titleService.setTitle('باب التوبة. الحديث السادس عشر - شرح رياض الصالحين');
  
  // وصف الصفحة لمجازات البحث
  this.metaService.updateTag({
    name: 'description',
    content: 'شرح وتدبر الحديث الشريف عن أبي هريرة رضي الله عنه: (والله إني لأستغفر الله وأتوب إليه في اليوم أكثر من سبعين مرة)، وبيان فضل ملازمة الاستغفار والبركات المستخلصة منه.'
  });
  
  // الكلمات المفتاحية
  this.metaService.updateTag({
    name: 'keywords',
    content: 'أبو هريرة, استغفر الله, أتوب إليه, فضل الاستغفار, باب التوبة, رياض الصالحين, الأربعون النووية, شرح الحديث, تدبر تفاعلي, نزول البركات'
  });
  
  // إعدادات بروتوكول Open Graph (لوسائل التواصل الاجتماعي)
  this.metaService.updateTag({ 
    property: 'og:title', 
    content: 'باب التوبة. الحديث السادس عشر - شرح رياض الصالحين'
  });
  
  this.metaService.updateTag({ 
    property: 'og:description', 
    content: 'اقرأ واستمع إلى الحديث الشريف بالتظليل التزامني، وتعرّف على المفردات والفوائد المستخلصة من ملازمة النبي ﷺ للاستغفار أكثر من سبعين مرة في اليوم.' 
  });
  
  this.metaService.updateTag({ 
    property: 'og:type', 
    content: 'article' 
  });
  }
  toggleRawiZoom(boxElement: HTMLElement) {
    this.isRawiMaximized = !this.isRawiMaximized;
    if (!this.isRawiMaximized) {
      this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
          this.isExplanationShown = false;
    }
    if (this.isRawiMaximized) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';   
    }
    this.cdr.detectChanges();
    setTimeout(() => {
      if (boxElement) {
        boxElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',   
          inline: 'nearest'
        });
      }
    }, 100); 
  }

  zoomInRawi() {
    if (this.fontSizeRawi < 36) {
      this.fontSizeRawi += 2;
      this.cdr.detectChanges();
    }
  }
  zoomOutRawi() {
    if (this.fontSizeRawi > 12) {
      this.fontSizeRawi -= 2;
      this.cdr.detectChanges();
    }
  }

  toggleBox1Zoom(boxElement: HTMLElement) {
    this.isBox1Maximized = !this.isBox1Maximized;

    if (this.isBox1Maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      this.fontSizeBox1 = 16;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox1);
    }

    this.cdr.detectChanges();

    setTimeout(() => {
      if (boxElement) {
        boxElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',  
          inline: 'center'
        });
      }
    }, 100);
  }

  zoomInBox1(boxElement: HTMLElement) {
    if (this.fontSizeBox1 < 36) {
      this.fontSizeBox1 += 2;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox1);
    }
  }

  zoomOutBox1(boxElement: HTMLElement) {
    if (this.fontSizeBox1 > 14) {
      this.fontSizeBox1 -= 2;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox1);
    }
  }

  private applyFontChangeDirect(element: HTMLElement, size: number) {
    if (element) {
      element.style.setProperty('--dynamic-font-size', `${size}px`);
      this.cdr.detectChanges();
    }
  }

  toggleBox2Zoom(boxElement: HTMLElement) {
    this.isBox2Maximized = !this.isBox2Maximized;

    if (this.isBox2Maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      this.fontSizeBox2 = 16;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox2);
    }

    this.cdr.detectChanges();

    setTimeout(() => {
      if (boxElement) {
        boxElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',  
          inline: 'center'
        });
      }
    }, 100);
  }

  zoomInBox2(boxElement: HTMLElement) {
    if (this.fontSizeBox2 < 36) {
      this.fontSizeBox2 += 2;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox2);
    }
  }

  zoomOutBox2(boxElement: HTMLElement) {
    if (this.fontSizeBox2 > 14) {
      this.fontSizeBox2 -= 2;
      this.applyFontChangeDirect(boxElement, this.fontSizeBox2);
    }
  }

  toggleExplanation() {
    this.isExplanationShown = !this.isExplanationShown;
  }

  private applyFontChange(selector: string, size: number) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.style.setProperty('--dynamic-font-size', `${size}px`);
      this.cdr.detectChanges();
    }
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
   window.speechSynthesis?.cancel();
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
  window.speechSynthesis?.cancel();
    this.isSpeakingTafsir = false;
    this.isTafsirPaused = false;
    this.cdr.detectChanges();
  }

  // ==========================================
  // المشغل الصوتي المطور والمزامن للسلايدر (Hadith 6)
  // ==========================================
playHadithAudio(url: string | undefined) {
  if (!url) return;

  // 1. إذا كان الصوت يعمل الآن -> نقوم بإيقافه مؤقتاً
  if (this.currentAudio && this.isPlaying) {
    this.currentAudio.pause();
    this.isPlaying = false;
    this.cdr.detectChanges();
    return;
  }

  // 2. إذا كان الصوت موجوداً وموقوفاً -> نعيد تشغيله مباشرة دون تحميل جديد
  if (this.currentAudio && !this.isPlaying) {
    this.isPlaying = true;
    this.cdr.detectChanges();
    this.currentAudio.play().catch(() => this.isPlaying = false);
    return;
  }

  // 3. حالة تشغيل ملف صوتي جديد لأول مرة (تحتاج تحميل)
window.speechSynthesis?.cancel();
  
  // تفعيل مؤشر التحميل فوراً قبل بدء الطلب
  this.isLoadingAudio = true; 
  this.cdr.detectChanges();

  this.http.get(url, { responseType: 'blob' }).subscribe({
    next: (blob) => {
      const localBlobUrl = URL.createObjectURL(blob);
      
      this.currentAudio = new Audio(localBlobUrl);
      this.isPlaying = true;
      
      // إيقاف مؤشر التحميل لأن الملف أصبح جاهزاً في المتصفح
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

        const index = this.hadith.phrases.findIndex(p => this.currentTime >= p.start && this.currentTime < p.end);
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
      console.error("خطأ في جلب ملف الصوت؛ قد يكون المستخدم أوف لاين ولم يخزن هذا الملف مسبقاً:", err);
      
      // إيقاف مؤشر التحميل وإرجاع الحالة للوضع الطبيعي عند حدوث خطأ شبكة
      this.isLoadingAudio = false; 
      this.isPlaying = false;
      this.cdr.detectChanges();
    }
  });
}

  // ⏭️ القفز الذكي للجملة التالية
  skipToNextPhrase() {
    if (!this.currentAudio || !this.hadith?.phrases) return;
    const nextIndex = this.currentPhraseIndex + 1;
    if (nextIndex >= 0 && nextIndex < this.hadith.phrases.length) {
      this.currentAudio.currentTime = this.hadith.phrases[nextIndex].start;
      this.currentTime = this.currentAudio.currentTime;
      this.cdr.detectChanges();
    }
  }

  // ⏮️ الترجيع الذكي للجملة السابقة (بحسب الاستهلاك الزمني للجملة الحالية)
  skipToPreviousPhrase() {
    if (!this.currentAudio || !this.hadith?.phrases) return;
    
    // إذا لم يعثر على أي جملة، نرجعه لبداية الصوت
    if (this.currentPhraseIndex === -1) {
      this.currentAudio.currentTime = 0;
      return;
    }

    const currentPhrase = this.hadith.phrases[this.currentPhraseIndex];
    const progressInPhrase = this.currentAudio.currentTime - currentPhrase.start;

    // إذا استمع لأكثر من ثانيتين من الجملة، يعود لبدايتها، وإلا يعود للجملة السابقة تماماً
    if (progressInPhrase > 2) {
      this.currentAudio.currentTime = currentPhrase.start;
    } else if (this.currentPhraseIndex > 0) {
      const prevPhrase = this.hadith.phrases[this.currentPhraseIndex - 1];
      this.currentAudio.currentTime = prevPhrase.start;
    } else {
      this.currentAudio.currentTime = 0;
    }
    this.currentTime = this.currentAudio.currentTime;
    this.cdr.detectChanges();
  }

  // 🎚️ السحب اليدوي للمؤشر الشريطي من قبل المستخدم
  onSliderChange(event: any) {
    if (this.currentAudio) {
      this.currentAudio.currentTime = Number(event.target.value);
      this.currentTime = this.currentAudio.currentTime;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
window.speechSynthesis?.cancel();
  }

  closeExplanationAndScroll(targetElement: HTMLElement) {
    this.isExplanationShown = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50); 
  }
}