import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; // 👈 استيراد HttpClient لتنزيل الملف بالكامل
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 استيراد كل شيء من ملف البيانات الخارجي دفعة واحدة بما فيها المصفوفات الجديدة
import { 
  hadithDetails,
  hadithImportanceList, 
  hadithFawaedList 
} from './hadith5-data';

@Component({
  selector: 'app-nawawi-5',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent,
    ZoomControlsComponent
  ],
  templateUrl: './nawawi-5.component.html',
  styleUrl: './nawawi-5.component.css'
})
export class Nawawi5Component implements OnInit, OnDestroy {
  // 👈 حقن خدمة HttpClient باستخدام inject
  private http = inject(HttpClient);

  // ربط المتغيرات المحلية بالبيانات المستوردة
  hadith = hadithDetails;
  box1Items = hadithImportanceList; // 👈 هنا ربطنا أهمية الحديث
  box2Items = hadithFawaedList;     // 👈 هنا ربطنا الفوائد

  // 🔎 تتبع أحجام الخطوط لكل حاوية وصندوق بشكل مستقل لمنع التداخل (طبقاً للمعيار الجديد)
  fontSizeRawi: number = window.innerWidth < 600 ? 14 : 20;
  fontSizeBox1: number = 16;
  fontSizeBox2: number = 16;

  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false; 
  currentPhraseIndex: number = -1;

  // Zoomkontroller för helskärmsmoduler enligt standard
  isRawiMaximized: boolean = false;
  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;

  // Kontroller för talsyntesen av förklaringen
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef, 
    private titleService: Title, 
    private metaService: Meta
  ) {}

  ngOnInit() {
    // 🏷️ تعيين عنوان الصفحة الديناميكي (Title Tag) Bevarat exakt
    this.titleService.setTitle('الحديث الخامس: إبطال المنكرات والبدع - شروح الأربعين النووية');

    // 🌐 تعيين وسوم الميتا الأساسية للسيو (Meta Tags) Bevarat exakt
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'شرح وتدبر الحديث الخامس من الأربعين النووية (إبطال المنكرات والبدع) عن أم المؤمنين عائشة. ميزان الأعمال الظاهرة وقاعدة الاتباع في الإسلام.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'الحديث الخامس, إبطال المنكرات والبدع, من أحدث في أمرنا, فهو رد, البدعة, الاتباع, عائشة أم المؤمنين, الأربعون النووية, شرح الأربعين النووية' 
    });
    
    // 📱 وسوم الميتا الخاصة بشبكات التواصل الاجتماعي (Open Graph) Bevarat exakt
    this.metaService.updateTag({ property: 'og:title', content: 'الحديث الخامس: إبطال المنكرات والبدع - تدبر تفاعلي متزامن' });
    this.metaService.updateTag({ property: 'og:description', content: 'استمع إلى حديث من أحدث في أمرنا هذا ما ليس منه فهو رد مع تظليل النص المتزامن وشرح وافٍ لقواعد رد المحدثات.' });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
  }

  // ==========================================
  // Gränssnittskontroller & Zoom (الحاوية الشاملة/الراوي)
  // ==========================================
  toggleRawiZoom(boxElement: HTMLElement) {
    this.isRawiMaximized = !this.isRawiMaximized;
    if (!this.isRawiMaximized) {
      this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
    }

    // 🔒 قفل أو فتح سكرول الصفحة بناءً على حالة التكبير
    if (this.isRawiMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    this.cdr.detectChanges();
    
    // انتظام السكرول في منتصف الشاشة تماماً بعد أن تأخذ الديف حجمها الجديد
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

  // ==========================================
  // التحكم في الفوائد (Box 1 & Box 2) طبقاً للمعيار الذكي الجديد
  // ==========================================
  toggleBox1Zoom(boxElement: HTMLElement) {
    this.isBox1Maximized = !this.isBox1Maximized;
    if (this.isBox1Maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';  
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

  zoomInBox1() {
    if (this.fontSizeBox1 < 36) {
      this.fontSizeBox1 += 2;
      this.applyFontChange('.box1-container', this.fontSizeBox1);
    }
  }

  zoomOutBox1() {
    if (this.fontSizeBox1 > 14) {
      this.fontSizeBox1 -= 2;
      this.applyFontChange('.box1-container', this.fontSizeBox1);
    }
  }

  toggleBox2Zoom(boxElement: HTMLElement) {
    this.isBox2Maximized = !this.isBox2Maximized;
    if (this.isBox2Maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';  
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

  zoomInBox2() {
    if (this.fontSizeBox2 < 36) {
      this.fontSizeBox2 += 2;
      this.applyFontChange('.box2-container', this.fontSizeBox2);
    }
  }

  zoomOutBox2() {
    if (this.fontSizeBox2 > 14) {
      this.fontSizeBox2 -= 2;
      this.applyFontChange('.box2-container', this.fontSizeBox2);
    }
  }

  toggleExplanation() {
    this.isExplanationShown = !this.isExplanationShown;
  }

  // 🛠️ الدالة المحدثة الذكية لتغيير حجم نصوص حاويات الفوائد ديناميكياً
  private applyFontChange(selector: string, size: number) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.style.setProperty('--dynamic-font-size', `${size}px`);
      this.cdr.detectChanges();
    }
  }

  // ==========================================
  // ميزة القراءة الصوتية للشرح (TTS)
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
  // تشغيل وإيقاف صوت متن الحديث المتزامن مع النص
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

  // 🧹 تنظيف وتدمير الأصوات فور مغادرة الصفحة لمنع التداخل
  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }

  // دالة إغلاق صندوق الشرح والسكرول المرن لأعلى صندوق الحديث
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