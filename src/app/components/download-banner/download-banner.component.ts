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

  // متغير جديد لمعرفة إذا كانت المستخدمة قد ضغطت بالفعل على الزر في هذه الجلسة
  hasClickedDownload: boolean = false;

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

    // الفحص الافتراضي عند عمل Refresh لمعرفة حالة التثبيت السابقة
    this.checkIfAppInstalledBefore();

    if (DownloadBannerComponent.wasClosedInThisSession) {
      this.isPocketHidden = true;
      return;
    }

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

  downloadApp(event: Event) {
    event.preventDefault();
    if (this.isAlreadyInstalled || this.hasClickedDownload) return; 

    // 1. نقوم بتغيير الحالة فوراً لإخفاء الزر ومنع الضغط المتكرر
    this.hasClickedDownload = true;
    this.cdr.detectChanges();

    alert(
      '⏳ بدأت عملية جلب ملفات التطبيق والمصحف الشريف الآن في الخلفية.\n\n' +
      'نظراً لظروف الشبكة، قد تستغرق العملية ما بين 30 ثانية إلى دقيقة كاملة.\n\n' +
      'الرجاء الانتظار وعدم إغلاق الصفحة، وسيتكفل المتصفح بإنشاء الأيقونة على جوالكِ فور اكتمال التنزيل! ✨'
    );

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome !== 'accepted') {
          // إذا ألغت الطلب تماماً، نعيد إتاحة الزر
          this.hasClickedDownload = false;
        }
        this.deferredPrompt = null;
        this.cdr.detectChanges();
      });
    } else {
      setTimeout(() => {
        alert(
          '💡 إرشاد إضافي:\n\n' +
          'إذا لم تظهر نافذة التثبيت التلقائية بعد قليل، يمكنكِ إتمام العملية يدوياً بالضغط على زر خيارات المتصفح (النقاط الثلاث) واختيار "إضافة إلى الشاشة الرئيسية".'
        );
      }, 1000);
    }
  }

  completeInstallationProcess() {
    this.hasClickedDownload = false;
    this.isAlreadyInstalled = true;
    localStorage.setItem('pwa_installed_status', 'true');
    this.cdr.detectChanges();

    alert('✨ مبارك! تم تثبيت تطبيق "هدى وتدبر" بنجاح على جوالكِ ويعمل الآن بدون إنترنت.');

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

  // 🛠️ زر الطوارئ لتصفير الكاش مع الحفاظ التام عليه عند الـ Refresh لإعادة التثبيت اليدوي والنظيف
  forceReinstall(event: Event) {
    event.preventDefault();
    
    localStorage.removeItem('pwa_installed_status');
    this.isAlreadyInstalled = false;
    this.hasClickedDownload = false;

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
    
    alert('تم تصفير كاش التطبيق بنجاح! عند إعادة تحميل الصفحة (Refresh) ستتمكنين من بدء تثبيت نظيف تماماً.');
  }
}