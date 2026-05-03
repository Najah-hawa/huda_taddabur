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


  // دالة القراءة الصوتية للتفسير
speakTafseer(text: string) {
  // إلغاء أي قراءة سابقة لتجنب تداخل الأصوات
  window.speechSynthesis.cancel();

  // تنظيف النص من أي وسم HTML (لأن التفسير عندك يستخدم innerHTML)
  const plainText = text.replace(/<[^>]*>/g, '');

  const utterance = new SpeechSynthesisUtterance(plainText);
  utterance.lang = 'ar-SA'; // اللغة العربية
  utterance.rate = 0.9;      // السرعة

  window.speechSynthesis.speak(utterance);
}

  //Öppna/stänga en sektion för att visa ayah för varje part i visual.
  toggleExpanded(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
 
}
