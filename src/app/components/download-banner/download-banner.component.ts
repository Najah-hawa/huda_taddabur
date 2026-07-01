import { Component, OnInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate } from '@angular/service-worker'; // Fixar PWA-cache

@Component({
  selector: 'app-download-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-banner.component.html',
  styleUrl: './download-banner.component.css'
})
export class DownloadBannerComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private swUpdate = inject(SwUpdate); // Fixar PWA-cache

  isExpanded: boolean = false;      
  isPocketHidden: boolean = false;  
  isAlreadyInstalled: boolean = false; 


  // 👇 تأكدي من وجود هذين السطرين هنا بالضبط 👇
  downloadStatus: 'idle' | 'downloading' | 'installing' | 'completed' = 'idle';
  downloadProgress: number = 0;

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  private static wasClosedInThisSession = false;

  ngOnInit() {
    // Tvinga fram uppdatering om en ny version finns på Vercel
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
    this.isAlreadyInstalled = false; 
    this.cdr.detectChanges();
  }

  @HostListener('window:appinstalled', ['$event'])
  onAppInstalled(event: Event) {
    this.isAlreadyInstalled = true;
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    localStorage.setItem('pwa_installed_status', 'true'); 
    this.cdr.detectChanges();
  }

  // 1. دالة التحميل المحدثة التي تستدعي شريط التقدم
  downloadApp(event: Event) {
    event.preventDefault();
    if (this.isAlreadyInstalled) return; 
    
    if (!this.deferredPrompt) {
      this.startProgressSimulation();
      return;
    }

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.startProgressSimulation(); // تشغيل العداد هنا عند قبول التثبيت
      } else {
        this.downloadStatus = 'idle';
        this.downloadProgress = 0;
      }
      this.deferredPrompt = null;
      this.cdr.detectChanges();
    });
  }

  // 2. الدالة المسؤولة عن تحريك الشريط المئوي من 0% إلى 100% (المحاكي الذكي)
  startProgressSimulation() {
    this.downloadStatus = 'downloading';
    this.downloadProgress = 0;
    this.cdr.detectChanges();

    const interval = setInterval(() => {
      if (this.downloadProgress < 90) {
        // يصعد العداد عشوائياً ليشعر المستخدم بالحركة
        this.downloadProgress += Math.floor(Math.random() * 10) + 5;
        if (this.downloadProgress > 90) this.downloadProgress = 90;
      } else if (this.downloadProgress >= 90 && this.downloadProgress < 99) {
        // يتباطأ قليلاً ليحاكي مرحلة التثبيت النهائي (Installing)
        this.downloadStatus = 'installing';
        this.downloadProgress += 1;
      } else {
        // عند الوصول إلى 100% نوقف العداد ونثبت التطبيق
        clearInterval(interval);
        this.downloadProgress = 100;
        this.completeInstallationProcess();
      }
      this.cdr.detectChanges();
    }, 400); // يتحدث كل 400 مللي ثانية
  }

  // 3. دالة إتمام التثبيت وإغلاق البانر بنجاح
  completeInstallationProcess() {
    this.downloadStatus = 'completed';
    this.isAlreadyInstalled = true;
    localStorage.setItem('pwa_installed_status', 'true');
    this.cdr.detectChanges();

    // إغلاق الكرت تلقائياً بعد ثانيتين لإعطاء مظهر احترافي
    setTimeout(() => {
      this.isExpanded = false;
      this.isPocketHidden = true;
      DownloadBannerComponent.wasClosedInThisSession = true;
      this.cdr.detectChanges();
    }, 2000);
  }

triggerBannerToggle() {
  // Hämtar det aktuella klick-eventet automatiskt och stoppar bubbling
  const event = window.event;
  if (event) {
    event.stopPropagation();
  }
  
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


  // 👇 أضيفي هذه الدالة في أسفل ملف الـ TS لتتوافق مع الـ HTML 👇
  forceReinstall(event: Event) {
    event.preventDefault();
    
    localStorage.removeItem('pwa_installed_status');
    this.isAlreadyInstalled = false;
    this.downloadStatus = 'idle';
    this.downloadProgress = 0;

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
    
    alert('تم تصفير كاش التطبيق بنجاح! يمكنكِ الآن المحاولة مجدداً وسيتتعرف متصفحكِ على الزر فوراً.');
  }
}