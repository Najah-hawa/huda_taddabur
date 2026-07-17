import { Component, Input, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../../zoom-controls/zoom-controls.component';
import { NextBeforeSurahMenyComponent } from '../../../next-before-surah-meny/next-before-surah-meny.component';
import { ProvComponent } from '../../prov/prov.component';
import { ALL_HADITHS } from './hadith-data';

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
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);

title: string = 'الأربعين النووية'; // قيمة افتراضية عامة
  name: string = '';
  hintText: string = '';
  audioUrl: string = '';
  phrases: { text: string; start: number; end: number }[] = [];
  explanation: string = '';
  source: string = 'متن الأربعين النووية';

  // الصناديق الأربعة الموحدة
  box1Title: string = '';
  box1Items: string[] = [];
  
  box2Title: string = '';
  box2Items: string[] = [];
  
  box3Title: string = '';
  box3Items: string[] = [];
  
  box4Title: string = '';
  box4Items: string[] = [];

  quizQuestions: any;

  // روابط القائمة والتنقل (ستحسب تلقائياً بالدالة)
  routeBefore: string = '/home';
  surahBefore: string = 'القائمة الرئيسية';
  routeAfter: string = '';
  surahNext: string = '';

  // السيو المخصص بكل حديث
  metaDescription: string = '';
  metaKeywords: string = '';
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
  this.route.paramMap.subscribe(params => {
    const hadithId = params.get('id'); // يقرأ الـ id من الراوتر
    if (hadithId) {
      this.loadHadithData(hadithId); // يستدعي دالة شحن البيانات
    }
  });
}

  loadHadithData(id: string) {
  const currentHadith = ALL_HADITHS[id];
  
  if (!currentHadith) return; // حماية برمجية في حال كان المعرّف غير موجود
this.isExplanationShown = false;
  // [1] تحديث البيانات الأساسية المعروضة في الـ HTML
  this.name = currentHadith.name;
  this.audioUrl = currentHadith.audioUrl;
  this.phrases = currentHadith.phrases;
  this.explanation = currentHadith.explanation;
  this.quizQuestions = currentHadith.quizQuestions; // إرسال بيانات الكويز ديناميكياً
  this.hintText = currentHadith.hintText;
  // [2] تحديث عناوين ونصوص الصناديق الأربعة ديناميكياً
  this.box1Title = currentHadith.box1Title;
  this.box1Items = currentHadith.box1Items;
  
  this.box2Title = currentHadith.box2Title;
  this.box2Items = currentHadith.box2Items;
  
  this.box3Title = currentHadith.box3Title;
  this.box3Items = currentHadith.box3Items;
  
  this.box4Title = currentHadith.box4Title;
  this.box4Items = currentHadith.box4Items;

  // [3] حساب أزرار التنقل الذكي (التالي والسابق) تلقائياً بناءً على رقم الحديث الحالي
  const currentNum = parseInt(id, 10);
  
  // زر السابق: إذا كان الحديث رقم 1 يرجع للقائمة الرئيسية، وإلا يرجع للحديث السابق
  this.routeBefore = currentNum > 1 ? `/hadith/hadith-nawawi-40/${currentNum - 1}` : '/home';
  this.surahBefore = currentNum > 1 ? 'الحديث السابق' : 'القائمة الرئيسية';
  
 // زر التالي: إذا وصلنا للحديث 42 ينقل للقائمة الرئيسية، وإلا ينقل للحديث التالي
this.routeAfter = currentNum < 20 ? `/hadith/hadith-nawawi-40/${currentNum + 1}` : '/home'; // أو مسار القائمة عندك مثلاً '/home'
this.surahNext = currentNum < 20? 'الحديث التالي' : 'العودة للقائمة الرئيسية';

  // [4] تحديث الـ Meta Tags برمجياً في الخلفية (الـ SEO) 🚀
  this.updateSEO(currentHadith);

  // إجبار أنجولار على تحديث الواجهة فوراً
  this.cdr.detectChanges();
} 
  private updateSEO(hadith: any) {
    // تحديث عنوان المتصفح العلوي (Title) ديناميكياً ليصبح مثلاً: "الحديث الأول: إنما الأعمال بالنيات - الأربعين النووية"
    this.titleService.setTitle(`${hadith.name} - الأربعين النووية`);

    // تحديث وسم الوصف (Description) الخاص بجوجل
    this.metaService.updateTag({ 
      name: 'description', 
      content: hadith.metaDescription || 'شرح وتدبر الأربعين النووية' 
    });

    // تحديث وسم الكلمات المفتاحية (Keywords)
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: hadith.metaKeywords || 'الأربعون النووية, أحاديث, تدبر' 
    });
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

// دالة التقديم 10 ثوانٍ للأمام
skipToNextPhrase() {
  if (!this.currentAudio) return;
  
  // حساب الوقت الجديد بعد إضافة 10 ثوانٍ
  const newTime = this.currentAudio.currentTime + 10;
  
  // التأكد من أن الوقت الجديد لا يتجاوز طول الملف الصوتي الإجمالي
  if (newTime < this.currentAudio.duration) {
    this.currentAudio.currentTime = newTime;
  } else {
    // إذا تجاوز، نذهب إلى نهاية الصوت مباشرة
    this.currentAudio.currentTime = this.currentAudio.duration;
  }
  
  this.currentTime = this.currentAudio.currentTime;
  this.cdr.detectChanges();
}

// دالة التأخير 10 ثوانٍ للخلف
skipToPreviousPhrase() {
  if (!this.currentAudio) return;
  
  // حساب الوقت الجديد بعد طرح 10 ثوانٍ
  const newTime = this.currentAudio.currentTime - 10;
  
  // التأكد من أن الوقت لا يقل عن الصفر
  if (newTime > 0) {
    this.currentAudio.currentTime = newTime;
  } else {
    // إذا قل عن الصفر، نعود للبداية تماماً
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