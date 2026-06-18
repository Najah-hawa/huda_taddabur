import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";

// 📥 استيراد كل شيء من ملف البيانات الخارجي دفعة واحدة بما فيها المصفوفات الجديدة
import { 
  hadithDetails, 
  poeticText, 
  hadithImportanceList, 
  hadithFawaedList 
} from './hadith2-data';

@Component({
  selector: 'app-nawawi-2',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './nawawi-2.component.html',
  styleUrl: './nawawi-2.component.css'
})
export class Nawawi2Component implements OnInit, OnDestroy {
  // ربط المتغيرات المحلية بالبيانات المستوردة
  hadith = hadithDetails;
  poeticText = poeticText;
  box1Items = hadithImportanceList; // 👈 هنا ربطنا أهمية الحديث
  box2Items = hadithFawaedList;     // 👈 هنا ربطنا الفوائد

  isExplanationShown: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false; 
  currentPhraseIndex: number = -1;

  // متغيرات التحكم في الـ 90vh
  isBox1Maximized: boolean = false;
  isBox2Maximized: boolean = false;

  // 💡 متغيرات جديدة للتحكم في قراءة الشرح الصوتي للحديث الثاني (تشغيل، إيقاف مؤقت، إنهاء)
  isSpeakingTafsir: boolean = false;
  isTafsirPaused: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef, 
    private titleService: Title, 
    private metaService: Meta
  ) {}

  ngOnInit() {
    // 🏷️ تعيين عنوان الصفحة الديناميكي (Title Tag)
    this.titleService.setTitle('الحديث الثاني: مراتب الدين (حديث جبريل) - شروح الأربعين النووية');

    // 🌐 تعيين وسوم الميتا الأساسية للسيو (Meta Tags)
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'شرح وتدبر الحديث الثاني من الأربعين النووية (حديث جبريل عليه السلام الطويل)، وفيه بيان مراتب الدين: الإسلام، الإيمان، والإحسان وأماراتها.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'حديث جبريل, مراتب الدين, الإسلام, الإيمان, الإحسان, علامات الساعة, الأربعون النووية, شرح الأربعين النووية' 
    });
    
    // 📱 وسوم الميتا الخاصة بشبكات التواصل الاجتماعي (Open Graph)
    this.metaService.updateTag({ property: 'og:title', content: 'الحديث الثاني: مراتب الدين - تدبر تفاعلي متزامن' });
    this.metaService.updateTag({ property: 'og:description', content: 'استمع إلى متن حديث جبريل عليه السلام مع تظليل النص المتزامن وشرح مفصل لمراتب الدين وأهم الفوائد التربوية.' });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
  }

  toggleBox1Zoom() {
    this.isBox1Maximized = !this.isBox1Maximized;
    this.cdr.detectChanges();
  }

  toggleBox2Zoom() {
    this.isBox2Maximized = !this.isBox2Maximized;
    this.cdr.detectChanges();
  }

  // ==========================================
  // التحكم بالصوت والحديث
  // ==========================================
  toggleExplanation() {
    this.isExplanationShown = !this.isExplanationShown;
  }

  // ==========================================
  // ميزة القراءة الصوتية للشرح (يدعم الإيقاف المؤقت والاستئناف)
  // ==========================================
  speakText(text: string | undefined) {
    if (!text) return;

    // 1. إذا كان الصوت يعمل الآن -> نقوم بعمل إيقاف مؤقت (Pause)
    if (this.isSpeakingTafsir && !this.isTafsirPaused) {
      window.speechSynthesis.pause();
      this.isTafsirPaused = true;
      this.cdr.detectChanges();
      return;
    }

    // 2. إذا كان الصوت متوقفاً مؤقتاً -> نقوم بعمل استئناف (Resume)
    if (this.isSpeakingTafsir && this.isTafsirPaused) {
      window.speechSynthesis.resume();
      this.isTafsirPaused = false;
      this.cdr.detectChanges();
      return;
    }

    // 3. إذا لم يكن يعمل أبداً -> نبدأ القراءة من البداية
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

  // 🛑 دالة إنهاء صوت الشرح تماماً في أي وقت وعودة الأزرار لحالتها الأصلية
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
    this.currentAudio = new Audio(url);
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
  }

  // 🧹 تنظيف وتدمير الأصوات فور مغادرة الصفحة لمنع التداخل
  ngOnDestroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }
}