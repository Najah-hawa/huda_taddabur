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
imageUrls: string[] = [];
currentImageIndex: number = 0;
imageRotations: number[] = [];
currentImageRotation: number = 0;
isImageError: boolean = false;
isImageLoading: boolean = false;
imageScale: number = 1;
audioUrl: string = '';
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
  if (!currentHadith) return;// حماية برمجية في حال كان المعرّف غير موجود
  
  this.isExplanationShown = false;
  
// 1. Nollställ bildstatus och rensa den gamla bilden direkt
  this.resetImageState();
  this.imageUrls = [];
// 2. تحديث البيانات الأساسية المعروضة في الـ HTML
  this.name = currentHadith.name;
  this.audioUrl = currentHadith.audioUrl;
// 🖼️ Läs in bilden/bilderna och återställ index
  this.imageUrls = currentHadith.imageUrls || (currentHadith.imageUrl ? [currentHadith.imageUrl] : []);
  this.imageRotations = currentHadith.imageRotations || [];
  this.currentImageIndex = 0;
  this.updateCurrentImageRotation();

  this.explanation = currentHadith.explanation;
  this.quizQuestions = currentHadith.quizQuestions; // إرسال بيانات الكويز ديناميكياً
  this.hintText = currentHadith.hintText;

// 3. تحديث عناوين ونصوص الصناديق الأربعة ديناميكياً
  this.box1Title = currentHadith.box1Title;
  this.box1Items = currentHadith.box1Items;
  
  this.box2Title = currentHadith.box2Title;
  this.box2Items = currentHadith.box2Items;
  
  this.box3Title = currentHadith.box3Title;
  this.box3Items = currentHadith.box3Items;
  
  this.box4Title = currentHadith.box4Title;
  this.box4Items = currentHadith.box4Items;

// 4. حساب أزرار التنقل الذكي (التالي والسابق) تلقائياً بناءً على رقم الحديث الحالي
  const currentNum = parseInt(id, 10);
  
  // زر السابق: إذا كان الحديث رقم 1 يرجع للقائمة الرئيسية، وإلا يرجع للحديث السابق
  this.routeBefore = currentNum > 1 ? `/hadith/hadith-nawawi-40/${currentNum - 1}` : '/home';
  this.surahBefore = currentNum > 1 ? 'الحديث السابق' : 'القائمة الرئيسية';
  
  // زر التالي: إذا وصلنا للحديث 20 ينقل للقائمة الرئيسية، وإلا ينقل للحديث التالي
  this.routeAfter = currentNum < 20 ? `/hadith/hadith-nawawi-40/${currentNum + 1}` : '/home';
  this.surahNext = currentNum < 20 ? 'الحديث التالي' : 'العودة للقائمة الرئيسية';

// 5. تحديث الـ Meta Tags برمجياً في الخلفية (الـ SEO) 🚀
  this.updateSEO(currentHadith);

// إجبار أنجولار على تحديث الواجهة فوراً
  this.cdr.detectChanges();
}

// 🔄 Hjälparfunktion för att nollställa bildtillståndet
resetImageState() {
  this.isImageLoading = true;
  this.isImageError = false;
  this.currentImageRotation = 0;
}
// 2. Anropas från HTML när den nya bilden har laddats färdigt i DOM-en
onImageLoad() {
  this.isImageLoading = false;
  this.isImageError = false;
  this.cdr.detectChanges();
}

// 3. Anropas från HTML om bilden misslyckas
onImageError() {
  this.isImageLoading = false;
  this.isImageError = true;
  this.cdr.detectChanges();
}
// 🖼️ Uppdatera rotationen för den aktiva bilden
updateCurrentImageRotation() {
  this.currentImageRotation = this.imageRotations[this.currentImageIndex] || 0;
}

// ▶️ Navigation i karusellen (Nästa bild)
nextImage() {
  if (this.currentImageIndex < this.imageUrls.length - 1) {
    this.currentImageIndex++;
    this.isImageLoading = true;
    this.isImageError = false;
    this.updateCurrentImageRotation();
  }
}
prevImage() {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
    this.isImageLoading = true;
    this.isImageError = false;
    this.updateCurrentImageRotation();
  }
}
// 🔘 Klick på prickarna i karusellen
setImageIndex(index: number) {
  if (index >= 0 && index < this.imageUrls.length) {
    this.currentImageIndex = index;
    this.isImageLoading = true;
    this.isImageError = false;
    this.updateCurrentImageRotation();
  }
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

 // 🎵 Spela / Pausa ljud
playHadithAudio(url: string | undefined) {
  if (!url) return;

  // 1. Om ljudet redan spelas -> Pausa
  if (this.currentAudio && this.isPlaying) {
    this.currentAudio.pause();
    this.isPlaying = false;
    this.cdr.detectChanges();
    return;
  }

  // 2. Om ljudet finns men är pausat -> Fortsätt spela
  if (this.currentAudio && !this.isPlaying) {
    this.isPlaying = true;
    this.cdr.detectChanges();
    this.currentAudio.play().catch(() => this.isPlaying = false);
    return;
  }

  // Stäng av eventuell talsyntes om den körs i bakgrunden
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  this.isLoadingAudio = true; 
  this.cdr.detectChanges();

  // Skapa nytt Audio-objekt
  this.currentAudio = new Audio(url);

  // När filens metadata har laddats (totaltid osv)
  this.currentAudio.onloadedmetadata = () => {
    if (this.currentAudio) {
      this.duration = this.currentAudio.duration;
      this.isLoadingAudio = false;
      this.cdr.detectChanges();
    }
  };

  // Uppdatera tidsindikatorn kontinuerligt
  this.currentAudio.ontimeupdate = () => {
    if (!this.currentAudio) return;
    this.currentTime = this.currentAudio.currentTime;
    this.cdr.detectChanges();
  };

  // När spårningen startar
  this.currentAudio.play()
    .then(() => {
      this.isPlaying = true;
      this.isLoadingAudio = false;
      this.cdr.detectChanges();
    })
    .catch((err) => {
      console.error('Fel vid uppspelning:', err);
      this.isLoadingAudio = false;
      this.isPlaying = false;
      this.cdr.detectChanges();
    });

  // När ljudet tar slut
  this.currentAudio.onended = () => {
    this.isPlaying = false;
    this.currentTime = 0;
    this.currentAudio = null;
    this.cdr.detectChanges();
  };
}

// ⏩ Hoppa 10 sekunder framåt
skipForward10() {
  if (!this.currentAudio) return;
  
  const newTime = this.currentAudio.currentTime + 10;
  this.currentAudio.currentTime = Math.min(newTime, this.currentAudio.duration || newTime);
  this.currentTime = this.currentAudio.currentTime;
  this.cdr.detectChanges();
}

// ⏪ Hoppa 10 sekunder bakåt
skipBackward10() {
  if (!this.currentAudio) return;
  
  const newTime = this.currentAudio.currentTime - 10;
  this.currentAudio.currentTime = Math.max(newTime, 0);
  this.currentTime = this.currentAudio.currentTime;
  this.cdr.detectChanges();
}

// 🎚️ Dra i tidslinjen (Slider)
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
    // 🔄 Återställ både text och bild till sin ursprungliga storlek när man stänger
    this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
    this.imageScale = 1; 
    this.isExplanationShown = false;
  }
  
  document.body.style.overflow = this.isRawiMaximized ? 'hidden' : 'auto';
  this.cdr.detectChanges();
  
  setTimeout(() => {
    if (boxElement) boxElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100); 
}

zoomInRawi() {
  if (this.fontSizeRawi < 40) { 
    this.fontSizeRawi += 4;  // Ökar med 4px så skillnaden syns tydligt!
    this.imageScale += 0.15; 
    console.log('Ny font-storlek för Tafsir:', this.fontSizeRawi); // Klicka på ➕ och kolla i Webbläsarens Console (F12)
    this.cdr.detectChanges(); 
  }
}

zoomOutRawi() {
  if (this.fontSizeRawi > 12) { 
    this.fontSizeRawi -= 3;  // Minskar textstorleken
    this.imageScale -= 0.15; // Gör bilden mindre
    this.cdr.detectChanges(); 
  }
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