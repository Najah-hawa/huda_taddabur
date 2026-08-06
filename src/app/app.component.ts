import { Component, OnInit, effect } from '@angular/core'; // ✅ التعديل الصحيح هنا من core
import { CommonModule } from '@angular/common'; // ✅ الـ CommonModule يأتي من common
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './services/language.service';
import { SwUpdate } from '@angular/service-worker'; 
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public titleText = {
    ar: 'هُدًى و تَدَبُّرْ',
    en: 'Huda & Tadabbur' // eller "Guidance & Reflection"
  };

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private swUpdate: SwUpdate, 
    public langService: LanguageService

  ) {
    // 🌟 Reaktiv lyssnare: Körs automatiskt varje gång språket ändras
    effect(() => {
      const isEnglish = this.langService.currentLang() === 'en';

      // 1. Uppdatera sidtiteln beroende på språk
      this.titleService.setTitle(
        isEnglish ? 'Huda & Tadabbur - Home' : 'هدى وتدبر - الرئيسية'
      );

      // 2. Uppdatera Meta Description
      this.metaService.updateTag({ 
        name: 'description', 
        content: isEnglish 
          ? 'Huda & Tadabbur app - Interactive contemplation of Juz Amma, Hadith of the Prophet, and interactive Islamic quizzes.' 
          : 'تطبيق هدى وتدبر - تفسير جزء عم بطريقة تفاعليه, عرض أحاديث رسول الله عليه الصلاة والسلام, مسابقات إسلامية تفاعلية للأطفال والكبار.' 
      });

      // 3. Uppdatera Meta Keywords
      this.metaService.updateTag({ 
        name: 'keywords', 
        content: isEnglish 
          ? 'Huda Tadabbur, Islamic Quizzes, Quran Reflection, Juz Amma Tafseer, Hadith' 
          : 'هدى وتدبر, مسابقات إسلامية, أمهات المؤمنين, نسب الرسول, ألعاب أطفال تفاعلية, جزء عم تفسيرو أحاديث الأربعين النووية' 
      });
    });
  }

  ngOnInit(): void {
    // 1. Initiera språket först av allt
    this.langService.initAppLanguage();

    // 2. Starta övervakning av PWA-uppdateringar i bakgrunden
    this.initAutoUpdateCheck();
  }

  private initAutoUpdateCheck() {
    if (this.swUpdate.isEnabled) {
      
      // أ - الاستماع الفوري والنشط لـ VERSION_READY (التحديث اللحظي المباشر)
      this.swUpdate.versionUpdates.subscribe(evt => {
        if (evt.type === 'VERSION_READY') {
          this.activateNewVersion();
        }
      });

      // ب - فحص فوري ونشط بمجرد إقلاع التطبيق
      this.swUpdate.checkForUpdate();

      // ج - فحص دوري تلقائي صامت في الخلفية كل 5 دقائق (300000 مللي ثانية)
      interval(300000).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
    }
  }

  private activateNewVersion() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}