import { Component, OnInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate } from '@angular/service-worker'; // إدارة كاش التحديثات لـ PWA

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

  // حالات التحكم في ظهور واختفاء البانر
  isExpanded: boolean = false;      
  isPocketHidden: boolean = false;  
  isAlreadyInstalled: boolean = false; 

  // تخزين حدث التثبيت الافتراضي للمتصفح
  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  private static wasClosedInThisSession = false;

  ngOnInit() {
    // 1. إجبار المتصفح على جلب التحديثات الجديدة فوراً من السيرفر (Vercel)
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(hasUpdate => {
        if (hasUpdate) {
          this.swUpdate.activateUpdate().then(() => {
            window.location.reload(); 
          });
        }
      });
    }

    // 2. إذا كان المستخدم يفتح الموقع بالفعل من داخل التطبيق المثبت (Standalone)
    if (this.isAppInStandaloneMode()) {
      this.isPocketHidden = true;
      return;
    }

    // 3. التحقق من حالة التثبيت المخزنة سابقاً
    this.checkIfAppInstalledBefore();

    // 4. إذا قام المستخدم بإغلاق البانر في هذه الجلسة لا يظهر مجدداً
    if (DownloadBannerComponent.wasClosedInThisSession) {
      this.isPocketHidden = true;
      return;
    }

    // 5. إظهار الكرت الكبير تلقائياً بعد ثانيتين من فتح الموقع لفت انتباه المستخدم
    setTimeout(() => {
      if (!this.isPocketHidden) {
        this.isExpanded = true;
        this.cdr.detectChanges();
      }
    }, 2000);
  }

  // الاستماع لحدث التثبيت الافتراضي من المتصفح وتخزينه
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

  // الاستماع لحدث اكتمال التثبيت الحقيقي على نظام الجوال
  @HostListener('window:appinstalled', ['$event'])
  onAppInstalled(event: Event) {
    this.isAlreadyInstalled = true;
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    localStorage.setItem('pwa_installed_status', 'true'); 
    this.cdr.detectChanges();
  }

  // دالة التنزيل الافتراضية الصافية والمستقرة
  downloadApp(event: Event) {
    event.preventDefault();
    if (this.isAlreadyInstalled) return; 
    
    // إذا كان المتصفح يعاند أو يمنع التثبيت التلقائي (مثل بعض متصفحات الجوال الداخلية)
    if (!this.deferredPrompt) {
      alert(
        '💡 التطبيق جاهز للتثبيت يدوياً:\n\n' +
        'الرجاء الضغط على زر النقاط الثلاث (خيارات المتصفح) في الأعلى أو الأسفل، ثم اختيار "إضافة إلى الشاشة الرئيسية" (Add to Home screen) أو "تثبيت التطبيق".'
      );
      return;
    }

    // إطلاق نافذة التثبيت الرسمية الخاصة بنظام التشغيل فوراً
    this.deferredPrompt.prompt();
    
    // مراقبة خيار المستخدم الحقيقي
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.isAlreadyInstalled = true;
        localStorage.setItem('pwa_installed_status', 'true');
      }
      this.deferredPrompt = null;
      this.cdr.detectChanges();
    });
  }

  // فتح وإغلاق تبديل شكل البانر (صغير / كبير)
  triggerBannerToggle() {
    const event = window.event;
    if (event) {
      event.stopPropagation();
    }
    this.isExpanded = !this.isExpanded;
    this.cdr.detectChanges();
  }

  // إغلاق الجيب الصغير بالكامل
  closePocketComplete(event: Event) {
    event.stopPropagation();
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    this.cdr.detectChanges();
  }

  // فحص بيئة التشغيل هل هي تطبيق مستقل أم متصفح ويب عادي
  private isAppInStandaloneMode(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = (window.navigator as any).standalone === true;
    return isStandalone || isNavigatorStandalone;
  }

  // فحص الذاكرة المحلية للتأكد من التثبيت السابق
  private checkIfAppInstalledBefore() {
    const localStatus = localStorage.getItem('pwa_installed_status');
    if (localStatus === 'true') {
      this.isAlreadyInstalled = true;
    }
  }

  // زر الطوارئ لتصفيير الكاش والـ Service Worker المعلق لتصحيح الأخطاء يدوياً
  forceReinstall(event: Event) {
    event.preventDefault();
    
    localStorage.removeItem('pwa_installed_status');
    this.isAlreadyInstalled = false;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister(); // حذف السيرفس وركر القديم
        }
      });
    }

    if ('caches' in window) {
      caches.keys().then(names => {
        for (const name of names) {
          caches.delete(name); // مسح الكاش المخزن
        }
      });
    }

    this.isExpanded = true;
    this.isPocketHidden = false;
    DownloadBannerComponent.wasClosedInThisSession = false;
    this.cdr.detectChanges();
    
    alert('تم تصفير كاش التطبيق بنجاح! يمكنكِ الآن إعادة محاولة التثبيت النظيف مجدداً.');
  }
}