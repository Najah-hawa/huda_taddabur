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



currentLevel: number = 1;
allGameNames: string[] = [];
treeSlots: { correctName: string, currentPlacedName: string | null, top: string, left: string }[] = [];
// تحديث المصفوفة في ملف الـ TS لتشمل الإحداثيات النسبية لكل جد
levelData: { [key: number]: { name: string, top: string, left: string }[] } = {
  1: [
    { name: 'محمد', top: '49%', left: '38%' }, // الجذع الأساسي الثابت
    { name: 'عَبْد الله', top: '38%', left: '19%' },
    { name: 'عَبْد المطلب', top: '38%', left: '57%' },
    { name: 'هَاشِم', top: '27%', left: '24%' },
    { name: 'عَبْد مَنَاف', top: '27%', left: '52%' },
    { name: 'قُصَي', top: '16%', left: '33%' },
    { name: 'كِلَاب', top: '16%', left: '46%' },
    { name: 'مُرَّة', top: '4%', left: '40%' }
  ],
  2: [
    // هنا سنضع إحداثيات الـ 16 غصناً للمستوى الثاني متوزعة يميناً ويساراً صعوداً
    { name: 'محمد', top: '71%', left: '43%' },

    { name: 'عَبْد الله', top: '63%', left: '59%' },
    { name: 'عَبْد المطلب', top: '63%', left: '29%' },
    { name: 'هَاشِم', top: '54%', left: '59%' },
    { name: 'عَبْد مَنَاف', top: '54%', left: '29%' },
    { name: 'قُصَي',top: '45%', left: '59%'  },
    { name: 'كِلَاب', top: '45%', left: '29%' },

    { name: 'مُرَّة',top: '36%', left: '59%' },
    { name: 'كَعْب',  top: '36%', left: '29%' },

    { name: 'لُؤَي',top: '26%', left: '59%'  },
    { name: 'غَالِب', top: '26%', left: '29%' },

    { name: 'فِهْر', top: '18%', left: '59%'  },
    { name: 'مَالِك', top: '18%', left: '29%'},

    { name: 'النَّضْر', top: '10%', left: '53%' },
    { name: 'كِنَانَة', top:  '10%', left: '29%'  },
    { name: 'خُزَيْمَة', top: '2%', left: '43%' }
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
  { name: 'النَّضْر' , top: '29%', left: '58' },
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


// دالة اختيار وتبديل المستوى
selectLevel(level: number) {
  this.currentLevel = level;
  this.loadLevel(level);
}


loadLevel(level: number) {
  const originalSlots = [...this.levelData[level]];

  // 1. بناء المربعات على الشجرة
  this.treeSlots = originalSlots.map(slot => ({
    correctName: slot.name,
    currentPlacedName: slot.name === 'محمد' ? 'محمد ﷺ' : null,
    top: slot.top,
    left: slot.left
  }));

  // 2. تصفية الأسماء مبعثرة في مصفوفة واحدة مدمجة وعمل خلط (Shuffle) لها
  let gameNames = originalSlots.filter(s => s.name !== 'محمد').map(s => s.name);
  gameNames.sort(() => Math.random() - 0.5);

  // 3. إسناد الأسماء للمصفوفة الموحدة
  this.allGameNames = gameNames;

  this.cdr.detectChanges();
}
// 🎚️ الدالة بعد التحديث لمنع الإسقاط العشوائي وفرض الترتيب من الأسفل للأعلى
onNameDropped(event: CdkDragDrop<string[]>, slotIndex: number) {
  const draggedName = event.previousContainer.data[event.previousIndex];
  const targetSlot = this.treeSlots[slotIndex];

  // 🛑 الشرط السحري: التحقق من الترتيب
  // إذا كان هذا ليس المربع الأول (index > 0)، نتحقق هل المربع الذي قبله (index - 1) ممتلئ؟
  if (slotIndex > 0) {
    const previousSlot = this.treeSlots[slotIndex - 1];
    if (!previousSlot.currentPlacedName) {
      console.log('يجب حل المربع السابق أولاً لترتيب النسب صعوداً!');
      // يمكنكِ هنا تشغيل صوت تنبيه قصير أو حركة اهتزاز
      return; // نوقف الدالة فوراً ولا نقبل الإسقاط
    }
  }

  // ✅ إذا مر من الشرط، نتحقق الآن هل الاسم صحيح؟
  if (targetSlot.correctName === draggedName) {
    // 1. تثبيت الاسم في المربع على الشجرة
    targetSlot.currentPlacedName = draggedName;

    // 2. حظر وحذف الاسم من القائمة الجانبية
    event.previousContainer.data.splice(event.previousIndex, 1);

    console.log('إجابة صحيحة ممتاز! صعدنا خطوة في الشجرة 🎉');
  } else {
    // إجابة خاطئة
    console.log('إجابة خاطئة، حاول مجدداً!');
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