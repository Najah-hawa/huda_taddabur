import { Component, ChangeDetectorRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http'; 
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { ZoomControlsComponent } from '../../hadith/zoom-controls/zoom-controls.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// 📥 استيراد بيانات نسب الرسول المحدثة (تأكدي من تعديل محتوى هذا الملف ليطابق النسب)
import { hadithDetails } from './quiz-data';

@Component({
  selector: 'app-mohamad-family',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule, 
    FooterInfoComponent, 
    ZoomControlsComponent,
    DragDropModule
  ],
  templateUrl: './mohamad-family.component.html',
  styleUrl: './mohamad-family.component.css'
})
export class MohamadFamilyComponent implements OnInit, OnDestroy {
  
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // بيانات نسب الرسول والصوت المقسم عبارات
  hadith = hadithDetails;

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
    // 🎯 تحديث عناوين الصفحة والـ Meta Tags لتناسب ميزة نسب الرسول ﷺ
    this.titleService.setTitle('نسب الرسول محمد ﷺ - مسابقات تفاعلية');
    this.loadLevel(1);
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تعلم واستمع إلى نسب الرسول محمد ﷺ الشريف صعوداً إلى أجداده، واختبر حفظك من خلال شجرة العائلة التفاعلية للأطفال والكبار.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'نسب الرسول, شجرة عائلة النبي, نسب محمد بن عبد الله, أجداد الرسول, مسابقات إسلامية للأطفال, PWA' 
    });
    
    this.metaService.updateTag({ property: 'og:title', content: 'نسب الرسول محمد ﷺ - شجرة العائلة التفاعلية' });
    this.metaService.updateTag({ property: 'og:description', content: 'استمع إلى نسب النبي الشريف مع ميزة التظليل التلقائي واختبر نفسك مع لعبة سحب الأسماء المسلية.' });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
  }

// 🕹️ متغيرات التحكم باللعبة والمستويات
  currentLevel: number = 1;
  allGameNames: string[] = []; // مصفوفة واحدة تجمع كل الأسماء المبعثرة للمستوى الحالي
  showSuccessModal: boolean = false; // التحكم في ظهور نافذة التهنئة المنبثقة
 maxUnlockedLevel: number = 1; // يبدأ اللعب والمستوى الأول فقط هو المفتوح
wrongSlotIndex: number | null = null; // لمتابعة أي مربع تم الإسقاط فيه بشكل خاطئ
treeSlots: { correctName: string, currentPlacedName: string | null, top: string, left: string }[] = [];
// تحديث المصفوفة في ملف الـ TS لتشمل الإحداثيات النسبية لكل جد
levelData: { [key: number]: { name: string, top: string, left: string }[] } = {
  1: [
    { name: 'محمد', top: '49%', left: '38%' }, // الجذع الأساسي الثابت
    { name: 'عَبْد الله',top: '38%', left: '57%'  },
    { name: 'عَبْد المطلب',  top: '38%', left: '19%'  },

    { name: 'هَاشِم',  top: '27%', left: '52%' },
    { name: 'عَبْد مَنَاف',top: '27%', left: '24%'  },

    { name: 'قُصَي', top: '16%', left: '46%'  },
    { name: 'كِلَاب',   top: '16%', left: '33%'},

    { name: 'مُرَّة', top: '4%', left: '40%' }
  ],
  2: [
    // هنا سنضع إحداثيات الـ 16 غصناً للمستوى الثاني متوزعة يميناً ويساراً صعوداً
  
    { name: 'عَبْد الله', top: '65%', left: '63%' },
    { name: 'عَبْد المطلب', top: '65%', left: '21%' },

    { name: 'هَاشِم', top: '55%', left: '68%' },
    { name: 'عَبْد مَنَاف', top: '55%', left: '17%' },

    { name: 'قُصَي',top: '46%', left: '68%'  },
    { name: 'كِلَاب', top: '46%', left: '16%' },

    { name: 'مُرَّة',top: '36%', left: '68%' },
    { name: 'كَعْب',  top: '36%', left: '16%' },

    { name: 'لُؤَي',top: '27%', left: '68%'  },
    { name: 'غَالِب', top: '27%', left: '17%' },

    { name: 'فِهْر', top: '18%', left: '64%'  },
    { name: 'مَالِك', top: '18%', left: '20%'},

    { name: 'النَّضْر', top: '9%', left: '59%' },
    { name: 'كِنَانَة', top:  '9%', left: '25%'  },
    { name: 'خُزَيْمَة', top: '2%', left: '42%' }
  ],
3: [
  // 1. المربع الأول الثابت في الأسفل (اسم النبي محمد ﷺ)
  { name: 'محمد', top: '79%', left: '43%' }, 

  // 2. الصف الثاني (بداية التفرع الثنائي للأجداد)
  { name: 'عَبْد الله' , top: '72%', left: '56%' },
  { name: 'عَبْد المطلب' , top: '72%', left: '30.5%' },

  // 3. الصف الثالث
  { name: 'هَاشِم' , top: '64%', left: '59%' },
  { name: 'عَبْد مَنَاف' , top: '64%', left: '27%' },

  // 4. الصف الرابع
  { name:  'قُصَي' , top: '57%', left: '59%' },
  { name: 'كِلَاب' , top: '57%', left: '27%' },

  // 5. الصف الخامس
  { name:'مُرَّة'  , top: '50%', left: '59%' },
  { name: 'كَعْب' , top: '50%', left: '27%' },

  // 6. الصف السادس
  { name: 'لُؤَي' , top: '43%', left: '58%' },
  { name: 'غَالِب' , top: '43%', left: '27%' },

  // 7. الصف السابع
  { name: 'فِهْر' , top: '35%', left: '58%' },
  { name: 'مَالِك' , top: '35%', left: '27%' },

  // 8. الصف الثامن
  { name: 'النَّضْر' , top: '29%', left: '58%' },
  { name: 'كِنَانَة' , top: '29%', left: '29%' },

  // 9. الصف التاسع
  { name: 'خُزَيْمَة' , top: '21%', left: '58%' },
  { name: 'مُدْرِكَة' , top: '21%', left: '27%' },

  // 10. الصف العاشر
  { name: 'إِلْيَاس' , top: '14%', left: '58%' },
  { name: 'مُضَر' , top: '14%', left: '30%' },

  // 11. الصف الحادي عشر
  { name: 'نِزَار',  top: '7%', left: '53%' },
  { name:  'مَعَدّ',  top: '7%', left: '34%' },
  
  { name: 'عَدْنَان',top: '2%', left: '42%' }, 
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
    this.treeSlots = originalSlots.map(slot => ({
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
  const targetSlot = this.treeSlots[slotIndex];

  // 🛑 1. فحص الترتيب الصارم (من الأسفل للأعلى)
  if (slotIndex > 0) {
    const previousSlot = this.treeSlots[slotIndex - 1];
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
    const isLevelComplete = this.treeSlots.every(slot => slot.currentPlacedName !== null);

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