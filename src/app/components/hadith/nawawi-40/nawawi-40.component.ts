import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SurahHintComponent } from "../../surah-hint/surah-hint.component";
import { FawaedOfSurahComponent } from "../../fawaed-of-surah/fawaed-of-surah.component";
import { FooterInfoComponent } from '../../footer-info/footer-info.component';
import { NextBeforeSurahMenyComponent } from "../../next-before-surah-meny/next-before-surah-meny.component";
import { hadithDetails, rawiInfos, hadithFawaed, hadithImportance } from './hadith-data';
// داخل كلاس المكونة نضيف السطر:

@Component({
  selector: 'app-nawawi-40',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SurahHintComponent,
    FawaedOfSurahComponent,
    FooterInfoComponent,
    NextBeforeSurahMenyComponent
  ],
  templateUrl: './nawawi-40.component.html',
  styleUrl: './nawawi-40.component.css'
})
export class Nawawi40Component {
  // جلب البيانات من ملف الـ Data حرفياً
  hadith = hadithDetails;
  rawiInfos = rawiInfos;
  fawaedText = hadithFawaed;
  importanceText = hadithImportance; 

  // التحكم في فتح وإغلاق شرح الحديث (مثل التفسير)
  isExplanationShown: boolean = false;

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

// Spela upp hadith-ljud från det angivna URL-fältet i vår data
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
}
