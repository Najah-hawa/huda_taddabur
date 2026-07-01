import { Component, OnInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-download-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-banner.component.html',
  styleUrl: './download-banner.component.css'
})
export class DownloadBannerComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private swUpdate = inject(SwUpdate); 

  isExpanded: boolean = false;      
  isPocketHidden: boolean = false;  
  isAlreadyInstalled: boolean = false; 

  // متغير لمعرفة إذا كانت عملية التحميل قد بدأت بعد الضغط على الزر
  isDownloadingNow: boolean = false;

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  private static wasClosedInThisSession = false;

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(hasUpdate => {
        if (hasUpdate) {
          this.swUpdate.activateUpdate().then(() => {
            window.location.reload(); 
          });
        }
      });
    }

    if (this.isAppInStandaloneMode()) {
      this.isPocketHidden = true;
      return;
    }

    this.checkIfAppInstalledBefore();

    if (DownloadBannerComponent.wasClosedInThisSession) {
      this.isPocketHidden = true;
      return;
    }

    // الـ ngOnInit الآن نظيفة تماماً ولا تقوم بأي تحميل تلقائي في الخلفية 🛑
    setTimeout(() => {
      if (!this.isPocketHidden) {
        this.isExpanded = true;
        this.cdr.detectChanges();
      }
    }, 2000);
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    e.preventDefault();
    if (this.isAppInStandaloneMode()) {
      this.isPocketHidden = true;
      return;
    }
    this.deferredPrompt = e;
    this.showInstallButton = true;
    this.cdr.detectChanges();
  }

  @HostListener('window:appinstalled', ['$event'])
  onAppInstalled(event: Event) {
    this.completeInstallationProcess();
  }

  // دالة التحميل الفورية عند كبس الزر 📥
  downloadApp(event: Event) {
    event.preventDefault();
    if (this.isAlreadyInstalled) return; 

    // تغيير الحالة لتظهر رسالة الانتظار في الواجهة فوراً
    this.isDownloadingNow = true;
    this.cdr.detectChanges();

    // إظهار تنبيه صريح للمستخدمة بالوقت والعملية
    alert(
      '⏳ بدأت عملية جلب وتثبيت ملفات تطبيق "هدى وتدبر" والمصحف الشريف الآن.\n\n' +
      'نظراً لأن التطبيق سيحفظ البيانات ليعمل لاحقاً بدون إنترنت، فقد تستغرق هذه العملية ما بين 30 ثانية إلى دقيقة كاملة حسب سرعة شبكتكِ.\n\n' +
      'الرجاء الانتظار ومتابعة الشاشة، ولا تقومي بإغلاق هذه الصفحة حتى يكتمل التثبيت وتظهر الأيقونة على جوالكِ بنجاح! ✨'
    );

    // إذا كان المتصفح يدعم إطلاق نافذة التثبيت الرسمية للاختصار
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome !== 'accepted') {
          // إذا ألغت المستخدمة الطلب، نعيد الحالة لوضعها الطبيعي
          this.isDownloadingNow = false;
        }
        this.deferredPrompt = null;
        this.cdr.detectChanges();
      });
    } 
    // إذا كان التثبيت يدوياً عبر النقاط الثلاث (المتصفح لا يدعم Prompt تلقائي)
    else {
      // نترك الرسالة التنبيهية تعمل، ونعلمها بكيفية التثبيت اليدوي احتياطاً
      setTimeout(() => {
        alert(
          '💡 تنبيه إضافي:\n\n' +
          'إذا لم تظهر لكِ نافذة التثبيت التلقائية الآن، يمكنكِ في أي وقت الضغط على زر الخيارات (النقاط الثلاث في أعلى أو أسفل المتصفح) واختيار "إضافة إلى الشاشة الرئيسية" لإنهاء التثبيت يدوياً.'
        );
      }, 1000);
    }
  }

  completeInstallationProcess() {
    this.isDownloadingNow = false;
    this.isAlreadyInstalled = true;
    localStorage.setItem('pwa_installed_status', 'true');
    this.cdr.detectChanges();

    alert('✨ مبارك! تم تحميل وتثبيت تطبيق "هدى وتدبر" بنجاح. ستجدين أيقونة التطبيق الآن على شاشة جوالكِ الرئيسية وتعمل بدون إنترنت.');

    setTimeout(() => {
      this.isExpanded = false;
      this.isPocketHidden = true;
      DownloadBannerComponent.wasClosedInThisSession = true;
      this.cdr.detectChanges();
    }, 2000);
  }

  triggerBannerToggle() {
    const event = window.event;
    if (event) event.stopPropagation();
    this.isExpanded = !this.isExpanded;
    this.cdr.detectChanges();
  }

  closePocketComplete(event: Event) {
    event.stopPropagation();
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    this.cdr.detectChanges();
  }

  private isAppInStandaloneMode(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = (window.navigator as any).standalone === true;
    return isStandalone || isNavigatorStandalone;
  }

  private checkIfAppInstalledBefore() {
    const localStatus = localStorage.getItem('pwa_installed_status');
    if (localStatus === 'true') {
      this.isAlreadyInstalled = true;
    }
  }

  // زر الطوارئ لتصفيير الكاش وإعادة التحميل النظيف عند الحاجة يدوياً 🛠️
  forceReinstall(event: Event) {
    event.preventDefault();
    
    localStorage.removeItem('pwa_installed_status');
    this.isAlreadyInstalled = false;
    this.isDownloadingNow = false;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    if ('caches' in window) {
      caches.keys().then(names => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }

    this.isExpanded = true;
    this.isPocketHidden = false;
    DownloadBannerComponent.wasClosedInThisSession = false;
    this.cdr.detectChanges();
    
    alert('تم تصفير كاش التطبيق بنجاح! يمكنكِ الآن الضغط على زر التحميل مجدداً لبدء عملية نظيفة.');
  }
}