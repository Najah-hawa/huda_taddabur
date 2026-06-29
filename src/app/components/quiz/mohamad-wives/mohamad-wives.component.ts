import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; 
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../../hadith/zoom-controls/zoom-controls.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// 📥 استيراد بيانات نسب الرسول المحدثة (تأكدي من تعديل محتوى هذا الملف ليطابق النسب)
import { mothersDetails } from './quiz-data'

@Component({
  selector: 'app-mohamad-wives',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule, 
    FooterInfoComponent, 
    ZoomControlsComponent,
    DragDropModule
  ],
  templateUrl: './mohamad-wives.component.html',
  styleUrl: './mohamad-wives.component.css'
})
export class MohamadWivesComponent implements OnInit, OnDestroy {
  @ViewChildren('lyricLine') lyricLines!: QueryList<ElementRef>;
// Denna variabel har du säkert redan för att hålla koll på aktiv rad

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // بيانات نسب الرسول والصوت المقسم عبارات
  hadith = mothersDetails;

  // إعدادات واجهة العرض والزوم
  fontSizeRawi: number = window.innerWidth < 600 ? 14 : 20;
  isRawiMaximized: boolean = false;
  isBox1Maximized: boolean = false;

  // 🎵 متغيرات المشغل الصوتي المطور لنسب الرسول ﷺ
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentPhraseIndex: number = -1;
  currentTime: number = 0;
  duration: number = 0;

ngOnInit() {
  // 🎯 تحديث عنوان الصفحة والـ Meta Tags لتناسب لعبة أمهات المؤمنين رضي الله عنهن
  this.titleService.setTitle('أمهات المؤمنين رضي الله عنهن - مسابقات تفاعلية');
  
  // تحميل المستوى الأول من بيوت أمهات المؤمنين
  this.loadLevel(1);
  
  // الكلمات الدلالية والوصف لمحركات البحث (SEO)
  this.metaService.updateTag({ 
    name: 'description', 
    content: 'تعلم واستمع إلى أنشودة أمهات المؤمنين رضي الله عنهن، واكتشف صفاتهن العذبة واختبر حفظك من خلال لعبة بيوت الحجرات التفاعلية المسلية للأطفال والكبار.' 
  });
  
  this.metaService.updateTag({ 
    name: 'keywords', 
    content: 'أمهات المؤمنين, زوجات الرسول, مسابقات إسلامية للأطفال, أنشودة أمهات المؤمنين, خديجة وعائشة, ألعاب تفاعلية إسلامية, PWA, سحب وإفلات' 
  });
  
  // تحسين الظهور على وسائل التواصل الاجتماعي (Open Graph Meta Tags)
  this.metaService.updateTag({ 
    property: 'og:title', 
    content: 'أمهات المؤمنين رضي الله عنهن - لعبة البيوت التفاعلية' 
  });
  
  this.metaService.updateTag({ 
    property: 'og:description', 
    content: 'استمع إلى أنشودة زوجات النبي ﷺ مع ميزة الكاريوكي والتظليل التلقائي، واختبر مهاراتك في ترتيب أسماء أمهات المؤمنين فوق بيوتهن.' 
  });
  
  this.metaService.updateTag({ 
    property: 'og:type', 
    content: 'article' 
  });
}
  scrollToCurrentLyric() {
    // Hitta det HTML-element som matchar det aktuella indexet
    const activeLineArray = this.lyricLines.toArray();
    const activeLine = activeLineArray[this.currentPhraseIndex];

    if (activeLine) {
      // Scrolla mjukt (smooth) och placera raden i mitten (center) av containern
      activeLine.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  
// 🕹️ متغيرات التحكم باللعبة والمستويات
  currentLevel: number = 1;
  allGameNames: string[] = []; // مصفوفة واحدة تجمع كل الأسماء المبعثرة للمستوى الحالي
  showSuccessModal: boolean = false; // التحكم في ظهور نافذة التهنئة المنبثقة
 maxUnlockedLevel: number = 1; // يبدأ اللعب والمستوى الأول فقط هو المفتوح
wrongSlotIndex: number | null = null; // لمتابعة أي مربع تم الإسقاط فيه بشكل خاطئ
houseSlots: { correctName: string, currentPlacedName: string | null, top: string, left: string }[] = [];
// تحديث المصفوفة في ملف الـ TS لتشمل الإحداثيات النسبية لكل جد
levelData: { [key: number]: { name: string, top: string, left: string }[] } = {
 1: [
  { name: 'خديجة', top: '14.5%', left: '19.5%' },    // البيت العلوي الأيسر
  { name: 'سودة', top: '19%', left: '61%' },    // البيت العلوي الأيمن
  { name: 'عائشة',  top: '47%', left: '20%' },    // البيت الأوسط الأيسر
  { name: 'حفصة',  top: '51%', left: '62%' }     // البيت الأوسط الأيمن
],
  2: [
    // هنا سنضع إحداثيات الـ 16 غصناً للمستوى الثاني متوزعة يميناً ويساراً صعوداً
  
    { name: 'خديجة', top: '11%', left: '17%' },
    { name: 'سودة', top: '12%', left: '63%' },

    { name: 'عائشة', top: '27%', left: '25%' },
    { name: 'حفصة', top: '29%', left: '69%' },

    { name: 'زينب بنت خزيمة',top: '44%', left: '43%'  },
    { name: 'أم سلمة', top: '56%', left: '15%' },

    { name: 'زينب بنت جحش',top: '57%', left: '68%' },
    { name: 'جويرية',  top: '73%', left: '44%' }
  ],
3: [
     { name: 'خديجة', top: '7%', left: '39%' },
    { name: 'سودة', top: '19%', left: '26%' },

    { name: 'عائشة', top: '21%', left: '65%' },
    { name: 'حفصة', top: '33%', left: '23%' },

    { name: 'زينب بنت خزيمة',top: '34%', left: '57%'  },
    { name: 'أم سلمة', top: '49%', left: '22%' },

    { name: 'زينب بنت جحش',top: '50%', left: '66%' },
    { name: 'جويرية',  top: '65%', left: '23%' },
  // 9. الصف التاسع
  { name: 'أم حبيبة' , top: '65%', left: '69%' },
  { name: 'صفية' , top: '83%', left: '23%' },

  // 10. الصف العاشر
  { name: 'ميمونة' , top: '83%', left: '61%' }
]
};


selectLevel(level: number) {
    this.showSuccessModal = false;
    this.loadLevel(level);
  }

// 📥 دالة بناء المرحلة وتجهيز الكروت العشوائية في الأعلى
  loadLevel(level: number) {
    this.currentLevel = level;
    const originalSlots = [...this.levelData[level]];

    // 1. بناء المربعات (الـ Slots) على الشجرة وتثبيت اسم النبي محمد ﷺ تلقائياً
    this.houseSlots = originalSlots.map(slot => ({
      correctName: slot.name,
      currentPlacedName: slot.name === 'محمد' ? 'محمد ﷺ' : null,
      top: slot.top,
      left: slot.left
    }));

    // 2. تصفية الأسماء المبعثرة (كل الأسماء عدا اسم محمد الثابت)
    let gameNames = originalSlots.filter(s => s.name !== 'محمد').map(s => s.name);
    
    // 3. عمل خلط (Shuffle) عشوائي فخم للكروت
    gameNames.sort(() => Math.random() - 0.5);

    // 4. إسناد الأسماء المخلومة للمصفوفة الموحدة العلوية
    this.allGameNames = gameNames;

    this.cdr.detectChanges();
  }

// 🔄 دالة السحب والإفلات عند إسقاط الكرت
onNameDropped(event: CdkDragDrop<string[]>, slotIndex: number) {
  const draggedName = event.previousContainer.data[event.previousIndex];
  const targetSlot = this.houseSlots[slotIndex];

  // 🛑 1. فحص الترتيب الصارم (من الأسفل للأعلى)
  if (slotIndex > 0) {
    const previousSlot = this.houseSlots[slotIndex - 1];
    if (!previousSlot.currentPlacedName) {
      console.log('يجب وضع الاسم السابق أولاً في الشجرة بالترتيب المتسلسل!');
      return;
    }
  }

  // ✅ 2. إذا كانت الإجابة صحيحة ومطابقة للجد
  if (targetSlot.correctName === draggedName) {
    // تثبيت الاسم على غصن الشجرة فوراً
    targetSlot.currentPlacedName = draggedName;

    // 🔄 3. حذف الكرت من المصفوفة العلوية بشكل صريح ومباشر لضمان التحديث
    this.allGameNames = this.allGameNames.filter(name => name !== draggedName);

    this.cdr.detectChanges();

    // 🏆 4. الطريقة المضمونة لفحص الفوز
    const isLevelComplete = this.houseSlots.every(slot => slot.currentPlacedName !== null);

    if (isLevelComplete) {
      // نفتح قفل المستوى التالي فوراً هنا لضمان فتح القفل قبل ظهور النافذة
      if (this.currentLevel < 3) {
        const nextLevel = this.currentLevel + 1;
        if (nextLevel > this.maxUnlockedLevel) {
          this.maxUnlockedLevel = nextLevel;
        }
      }
      
      this.cdr.detectChanges();

      // إطلاق الاحتفالات وظهور النافذة
      setTimeout(() => {
        this.celebrateWin();
      }, 100);
    }

  } else {
    // ❌ 5. إذا كانت الإجابة خاطئة: نقوم بتفعيل تأثير التنبيه البصري (الوميض والاهتزاز)
    this.wrongSlotIndex = slotIndex;
    this.cdr.detectChanges();

    // إزالة تأثير الخطأ بعد 800 ملي ثانية لتهيئة المربع للمحاولة القادمة
    setTimeout(() => {
      this.wrongSlotIndex = null;
      this.cdr.detectChanges();
    }, 600);
  }

} // 👈 هذا هو القوس الأساسي الذي كان مفقوداً وتسبب في الـ 38 خطأ!

// 🎵 دالة تشغيل الاحتفالات والكونفيتي عند اكتمال المرحلة
  celebrateWin() {
    this.showSuccessModal = true;

    // 1. تشغيل صوت التصفيق من ملفات الـ Assets
    const audio = new Audio('audio/play-game/klapping.mpeg');
    audio.play().catch(err => console.log('بانتظار تفاعل المستخدم الصوتي الأول في المتصفح'));

    // 2. إطلاق تأثير القصاصات المتطايرة (Confetti) عبر المكتبة المدمجة في الـ index.html
    try {
      const confetti = (window as any).confetti;
      if (confetti) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (e) {
      console.log('مكتبة canvas-confetti غير معرفة بالـ global window');
    }
    
    this.cdr.detectChanges();
  }

// ⏭️ زر الانتقال السريع للمستوى التالي من داخل كرت الفوز المنبثق
goToNextLevel() {
  this.showSuccessModal = false;
  
  if (this.currentLevel < 3) {
    this.currentLevel++;
    
    // 🔓 إذا كان المستوى الجديد أكبر من أقصى مستوى مفتوح، نقوم بفتحه!
    if (this.currentLevel > this.maxUnlockedLevel) {
      this.maxUnlockedLevel = this.currentLevel;
    }
    
    this.loadLevel(this.currentLevel);
  } else {
    // في حال إنهاء المستوى الثالث والأخير بالكامل
    this.currentLevel = 1;
    this.loadLevel(1);
  }
}
  // ==========================================
  // التحكم في تكبير/تصغير صندوق العرض الأول (النسب)
  // ==========================================
  toggleRawiZoom(boxElement: HTMLElement) {
    this.isRawiMaximized = !this.isRawiMaximized;
    if (!this.isRawiMaximized) {
      this.fontSizeRawi = window.innerWidth < 600 ? 14 : 20;
    }
    document.body.style.overflow = this.isRawiMaximized ? 'hidden' : 'auto'; 
    
    this.cdr.detectChanges();
    setTimeout(() => {
      if (boxElement) {
        boxElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  // التحكم في تكبير/تصغير صندوق اللعبة الثاني (الشجرة)
  // ==========================================
  toggleBox1Zoom(boxElement: HTMLElement) {
    this.isBox1Maximized = !this.isBox1Maximized;
    document.body.style.overflow = this.isBox1Maximized ? 'hidden' : 'auto';

    this.cdr.detectChanges();
    setTimeout(() => {
      if (boxElement) {
        boxElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  zoomInBox1(boxElement: HTMLElement) {
    this.applyFontChangeDirect(boxElement, 2);
  }

  zoomOutBox1(boxElement: HTMLElement) {
    this.applyFontChangeDirect(boxElement, -2);
  }

  private applyFontChangeDirect(element: HTMLElement, amount: number) {
    if (element) {
      const currentSize = parseInt(element.style.getPropertyValue('--dynamic-font-size') || '15');
      const newSize = currentSize + amount;
      if (newSize >= 14 && newSize <= 36) {
        element.style.setProperty('--dynamic-font-size', `${newSize}px`);
        this.cdr.detectChanges();
      }
    }
  }

  // ==========================================
  // مشغل الصوت المتزامن لنسب الرسول ﷺ
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

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const localBlobUrl = URL.createObjectURL(blob);
        
        this.currentAudio = new Audio(localBlobUrl);
        this.isPlaying = true;
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

          // البحث عن جملة النسب الحالية لتظليلها
          const index = this.hadith.phrases.findIndex(p => this.currentTime >= p.start && this.currentTime < p.end);
          if (index !== this.currentPhraseIndex) {
            this.currentPhraseIndex = index;
            this.scrollToCurrentLyric();
          }
          this.cdr.detectChanges();
        };
        
        this.currentAudio.play()
          .then(() => this.cdr.detectChanges())
          .catch(() => this.isPlaying = false);
          
        this.currentAudio.onended = () => {
          this.resetAudioPlayer();
        };
      },
      error: (err) => {
        console.error("خطأ في جلب ملف الصوت؛ قد يكون المستخدم أوف لاين:", err);
        this.isPlaying = false;
        this.cdr.detectChanges();
      }
    });
  }

  skipToNextPhrase() {
    if (!this.currentAudio || !this.hadith?.phrases) return;
    const nextIndex = this.currentPhraseIndex + 1;
    if (nextIndex >= 0 && nextIndex < this.hadith.phrases.length) {
      this.currentAudio.currentTime = this.hadith.phrases[nextIndex].start;
      this.currentTime = this.currentAudio.currentTime;
      this.cdr.detectChanges();
    }
  }

  skipToPreviousPhrase() {
    if (!this.currentAudio || !this.hadith?.phrases) return;
    if (this.currentPhraseIndex === -1) {
      this.currentAudio.currentTime = 0;
      return;
    }

    const currentPhrase = this.hadith.phrases[this.currentPhraseIndex];
    const progressInPhrase = this.currentAudio.currentTime - currentPhrase.start;

    if (progressInPhrase > 2) {
      this.currentAudio.currentTime = currentPhrase.start;
    } else if (this.currentPhraseIndex > 0) {
      this.currentAudio.currentTime = this.hadith.phrases[this.currentPhraseIndex - 1].start;
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

  private resetAudioPlayer() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.currentPhraseIndex = -1;
    this.currentAudio = null;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }


  
}