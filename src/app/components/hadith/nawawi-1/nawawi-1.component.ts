import { Component , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FawaedOfSurahComponent } from "../../fawaed-of-surah/fawaed-of-surah.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";
import { hadithDetails, rawiInfos, hadithFawaed, hadithImportance } from './hadith-data';
// داخل كلاس المكونة نضيف السطر:

@Component({
  selector: 'app-nawawi-1',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FawaedOfSurahComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './nawawi-1.component.html',
  styleUrl: './nawawi-1.component.css'
})
export class Nawawi1Component {
  // جلب البيانات من ملف الـ Data حرفياً
  hadith = hadithDetails;
  rawiInfos = rawiInfos;
  fawaedText = hadithFawaed;
  importanceText = hadithImportance; 

  // التحكم في فتح وإغلاق شرح الحديث (مثل التفسير)
  isExplanationShown: boolean = false;

  // 💡 تعريف كائن الصوت على مستوى الكامبوننت ليحتفظ بنقطة التوقف
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false; // تتبع حالة التشغيل للتحكم بالزر

  toggleExplanation() {
    this.isExplanationShown = !this.isExplanationShown;
  }

  // إعادة استخدام ميزة القراءة الصوتية للنصوص العربية للشرح أو المتن
 speakText(text: string | undefined) {
    if (!text) return;
    
    window.speechSynthesis.cancel();
    const plainText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
  
    utterance.lang = 'ar';
    utterance.rate = 0.9;
    
    utterance.onerror = (event) => {
      console.error("حدث خطأ في القراءة الصوتية:", event.error);
    };
    window.speechSynthesis.speak(utterance);
  }

/*Spela upp hadith-ljud från det angivna URL-fältet i vår data
playHadithAudio(url: string | undefined) {
  if (!url) {
    console.error("Ingen ljudlänk hittades för denna hadith.");
    return;
  }

  // Stoppa eventuella tidigare ljud eller webbläsarröster
  window.speechSynthesis.cancel();

  console.log("Strömmar live-ljud från Archive.org:", url);

  const audio = new Audio(url);
  
  audio.play().catch(error => {
    console.error("Archive.org blockerade inte, men ett fel uppstod vid uppspelning:", error);
  });
}
*/


 // 💡 نقوم بحقن الـ ChangeDetectorRef داخل الكومبوينت
constructor(private cdr: ChangeDetectorRef) {}

  playHadithAudio(url: string | undefined) {
    if (!url) {
      console.error("Ingen ljudlänk hittades.");
      return;
    }

    // 1. إذا كان الصوت يعمل وضغطنا -> إيقاف مؤقت فوراً
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.cdr.detectChanges(); // 💡 إجبار HTML على التحديث لرؤية الأيقونة الجديدة
      return;
    }

    // 2. إذا كان الصوت موجوداً وموقفاً -> استئناف
    if (this.currentAudio && !this.isPlaying) {
      this.isPlaying = true;
      this.cdr.detectChanges(); // 💡 تحديث الأيقونة فوراً
      
      this.currentAudio.play().catch(error => {
        console.error("Feil vid resume:", error);
        this.isPlaying = false;
        this.cdr.detectChanges();
      });
      return;
    }

    // 3. بناء كائن الصوت لأول مرة
    window.speechSynthesis.cancel();
    
    this.currentAudio = new Audio(url);
    this.isPlaying = true;
    this.cdr.detectChanges(); // 💡 تحديث الأيقونة فوراً لتصبح ريمز الـ Pause

    this.currentAudio.play()
      .then(() => {
        console.log("Audio spelar nu framgångsrikt!");
        // نضمن بقاء الأيقونة صحيحة عند بدء البث الفعلي
        this.isPlaying = true;
        this.cdr.detectChanges(); 
      })
      .catch(error => {
        console.error("Feil vid första uppspelning:", error);
        this.isPlaying = false;
        this.cdr.detectChanges();
      });

    // عندما ينتهي الملف بالكامل
    this.currentAudio.onended = () => {
      this.isPlaying = false;
      this.currentAudio = null;
      this.cdr.detectChanges(); // 💡 إعادة الزر لشكل الـ Play عند انتهاء الصوت
    };
  }

  ngOnDestroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

