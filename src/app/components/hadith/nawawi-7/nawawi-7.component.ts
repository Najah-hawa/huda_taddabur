import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; // 👈 استيراد HttpClient لتنزيل الملف بالكامل
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 Hämta strukturerad data specifikt för Hadith 6
import { hadithDetails, hadithImportanceList, hadithFawaedList} from './hadith7-data';

@Component({
  selector: 'app-nawawi-7',
  standalone: true,
  imports: [ CommonModule, RouterModule, SurahHintComponent, FooterInfoComponent, NextBeforeSurahMenyComponent, ZoomControlsComponent ],
  templateUrl: './nawawi-7.component.html',
  styleUrl: './nawawi-7.component.css'
})

export class Nawawi7Component implements OnInit, OnDestroy {

  // 👈 حقن خدمة HttpClient باستخدام inject
  private http = inject(HttpClient);

  // Koppla lokala variabler till Hadith 6:s datastruktur
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;    
 

  // 🔎 تتبع أحجام الخطوط لكل حاوية وصندوق بشكل مستقل لمنع التداخل
  fontSizeRawi: number = window.innerWidth < 600 ? 14 : 20;
  fontSizeBox1: number = 16;
  fontSizeBox2: number = 16;
  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentPhraseIndex: number = -1;

  // Zoomkontroller för helskärmsmoduler
  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;
  isRawiMaximized: boolean = false;

  // Kontroller för talsyntesen av förklaringen
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private titleService: Title, private metaService: Meta) {}

ngOnInit() {
  // 🎯 الأوزان الفريدة وعناوين Meta المقترحة والمتوافقة مع السيو للحديث السابع
  this.titleService.setTitle('الحديث السابع: الدين النصيحة - شروح الأربعين النووية');
  this.metaService.updateTag({
    name: 'description',
    content: 'شرح وتدبر الحديث السابع من الأربعين النووية (الدين النصيحة)، مع بيان حكم النصيحة وآدابها وكيف تكون لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.'
  });
  this.metaService.updateTag({
    name: 'keywords',
    content: 'الدين النصيحة, الحديث السابع, الأربعون النووية, تميم بن أوس الداري, حكم النصيحة, آداب النصيحة, النصيحة لله ولكتابه, شرح الحديث'
  });
  this.metaService.updateTag({ property: 'og:title', content: 'الحديث السابع: الدين النصيحة - تدبر تفاعلي' });
  this.metaService.updateTag({ property: 'og:description', content: 'اقرأ واستمع إلى متن الحديث السابع مع الشرح الصوتي، تفسير المفردات، وأبرز الفوائد عن كون النصيحة فرض كفاية ومن أعظم الأعمال.' });
  this.metaService.updateTag({ property: 'og:type', content: 'article' });
}
  // Gränssnittskontroller & Zoom (الحاوية الشاملة/الراوي)

toggleRawiZoom(boxElement: HTMLElement) {
    this.isRawiMaximized = !this.isRawiMaximized;
    if (!this.isRawiMaximized) {
      this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
    }
    // 🔒 قفل أو فتح سكرول الصفحة بناءً على حالة التكبير
    if (this.isRawiMaximized) {
      document.body.style.overflow = 'hidden'; /* يمنع السكرول للأسفل تماماً */
    } else {
      document.body.style.overflow = 'auto';   /* يعيد السكرول الطبيعي عند الإغلاق */
    }
    this.cdr.detectChanges();
    // 3. انتظام السكرول في منتصف الشاشة تماماً بعد أن تأخذ الديف حجمها الجديد
    setTimeout(() => {
      if (boxElement) {
      boxElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',   
      inline: 'nearest'
      });
      }
    }, 100); // مهلة 100ms كافية جداً لمنع قفز المتصفح لأعلى الصفحة
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

  // التحكم في الفوائد الأربعة (Box 1 -> Box 4)

// دالة تكبير وتصغير البوكس مع السكرول المباشر للمنتصف
toggleBox1Zoom(boxElement: HTMLElement) {
    this.isBox1Maximized = !this.isBox1Maximized;

    if (this.isBox1Maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
      // Återställ fonten stabilt utan att krocka med vh-designen
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


  // 💎 Ny säker funktion som ändrar direkt på elementet istället för med klass-sökning
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
      // Återställ fonten stabilt utan att krocka med vh-designen
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

  // 🛠️ الدالة المحدثة الذكية لاستهداف الـ Selector المناسب وتغيير حجم نصوصه فقط
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

    document.body.style.overflow = 'auto';

    if (this.currentAudio) {

      this.currentAudio.pause();

      this.currentAudio = null;

    }

    window.speechSynthesis.cancel();

  }



  // Funktion för att stänga förklaringen och rulla smidigt tillbaka till Hadith-boxen

  closeExplanationAndScroll(targetElement: HTMLElement) {

    // 1. Stäng förklaringsboxen

    this.isExplanationShown = false;

   

    // 2. Tvinga Angular att uppdatera vyn så att rutan försvinner direkt

    this.cdr.detectChanges();

   

    // 3. Rulla skärmen mjukt tillbaka till toppen av Hadith-containern

    setTimeout(() => {

      targetElement.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

    }, 50); // En mikroskopisk fördröjning så att DOM:en hinner uppdateras

  }





} 

