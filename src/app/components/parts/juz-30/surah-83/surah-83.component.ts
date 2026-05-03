import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SurahHintComponent } from '../../../surah-hint/surah-hint.component';
import { SurahsStartComponent } from '../../../surahs-start/surahs-start.component';
import { SurahTabsComponent } from '../../../surah-tabs/surah-tabs.component';
import { QuixTafserComponent } from '../../../quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from '../../../footer-info/footer-info.component';
import { FawaedOfSurahComponent } from '../../../fawaed-of-surah/fawaed-of-surah.component';
import { verses, abassaQuestions, rubtTassweerySections } from './surah83-data';
import { RouterModule } from '@angular/router';
import { NextBeforeSurahMenyComponent } from "../../../next-before-surah-meny/next-before-surah-meny.component";



@Component({
  selector: 'app-surah-83',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SurahHintComponent,
    SurahsStartComponent,
    SurahTabsComponent,
    QuixTafserComponent,
    FooterInfoComponent,
    FawaedOfSurahComponent,
    NextBeforeSurahMenyComponent
],
   templateUrl: './surah-83.component.html',
   styleUrls: ['./surah-83.component.css']
})
export class Surah83Component {
  // flikstyrning
  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';
  // toggling av tafsir
  shown = new Set<number>();
  //skapar ett objekt där nycklarna är siffror (number) och värdena är boolean (true eller false).
  expandedSections: { [key: number]: boolean } = {};

  // ✅ Lägg till importerade data som medlemmar
  verses = verses;
  abassaQuestions = abassaQuestions;
  rubtTassweerySections = rubtTassweerySections;

  // uppdatera vald flik
  onTabChange(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
  }

  //Hitta texten för en viss vers baserat på versens nummer. visa ayah
  getVerseText(number: number): string {
  const verse = this.verses.find(v => v.number === number);
  return verse ? verse.text : '';
  }
  
  //visa eller dölja tafsir för varje vers.
 toggleVerse(index: number) {
  if (this.shown.has(index)) {
    this.shown.clear(); // stäng allt
  } else {
    this.shown.clear(); // stäng allt
    this.shown.add(index); // öppna bara den klickade
  }
  }


speakTafseer(text: string | undefined) {
  if (!text) return;
  
  console.log("النص المراد قراءته:", text); // للتأكد أن النص يصل للدالة

  window.speechSynthesis.cancel();
  const plainText = text.replace(/<[^>]*>/g, '');
  const utterance = new SpeechSynthesisUtterance(plainText);

  // اختبار: ابحثي عن الأصوات المتاحة في متصفحك
  const voices = window.speechSynthesis.getVoices();
  console.log("الأصوات المتاحة:", voices);

  utterance.lang = 'ar';
  utterance.rate = 0.9;
  
  // إضافة معالج للأخطاء لنعرف ماذا يحدث
  utterance.onerror = (event) => {
    console.error("حدث خطأ في القراءة الصوتية:", event.error);
  };
  window.speechSynthesis.speak(utterance);
}


// دالة لتشغيل صوت الآية
playAyah(ayahNum: number) {
  const surahNum = 83; // رقم سورة المطففين
  
  // تنسيق الأرقام لتصبح 3 خانات (مثلاً 1 يصبح 001)
  const formattedSurah = surahNum.toString().padStart(3, '0');
  const formattedAyah = ayahNum.toString().padStart(3, '0');
  
  // بناء الرابط للقارئ المنشاوي (يمكنكِ تغيير القارئ بتغيير اسم المجلد)
  const audioUrl = `https://www.everyayah.com/data/Al_Minshawi_Murattal_128kbps/${formattedSurah}${formattedAyah}.mp3`;
  
  // إيقاف أي صوت شغال حالياً (تفسير أو آية سابقة)
  window.speechSynthesis.cancel(); 
  
  const audio = new Audio(audioUrl);
  audio.play().catch(error => console.error("خطأ في تشغيل صوت الآية:", error));
}
  //Öppna/stänga en sektion för att visa ayah för varje part i visual.
  toggleExpanded(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
 
}
