import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-banner.component.html',
  styleUrls: ['./download-banner.component.css']
})
export class DownloadBannerComponent implements OnInit {
  isExpanded: boolean = false;      // للتحكم بالكرت الكبير
  isPocketHidden: boolean = false;  // للتحكم بإخفاء الجيب الصغير تماماً

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  // 💡 متغير برمجي ثابت يعيش داخل الجلسة الحالية للكود فقط
  private static wasClosedInThisSession = false;

 ngOnInit() {
  if (this.isAppInstalled()) {
    this.isPocketHidden = true;
    return;
  }

  // إذا تم إغلاق البانر مسبقاً في هذه الجلسة، يبقى مخفياً أثناء التنقل
  if (DownloadBannerComponent.wasClosedInThisSession) {
    this.isPocketHidden = true;
    return;
  }

  // فتح الكرت تلقائياً بعد ثانيتين إذا لم يكن مخفياً
  setTimeout(() => {
    if (!this.isPocketHidden) {
      this.isExpanded = true;
    }
  }, 2000);
}

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    e.preventDefault();
    if (this.isAppInstalled()) {
      this.isPocketHidden = true;
      return;
    }
    this.deferredPrompt = e;
    this.showInstallButton = true;
  }

  downloadApp(event: Event) {
    event.preventDefault();
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.isPocketHidden = true;
        this.isExpanded = false;
        DownloadBannerComponent.wasClosedInThisSession = true; // حفظ الإغلاق للأبد بعد التثبيت
      }
      this.deferredPrompt = null;
    });
  }

  toggleBanner() {
    this.isExpanded = !this.isExpanded;
  }

  // دالة إغلاق الجيب عند الضغط على X
  closePocketComplete(event: Event) {
    event.stopPropagation();
    this.isPocketHidden = true;
    this.isExpanded = false;

    // 📥 تفعيل الراية البرمجية الثابتة: المتصفح سيتذكرها أثناء التنقل فقط!
    // وعند الضغط على F5، يعاد تحميل الـ JavaScript بالكامل وتعود هذه القيمة تلقائياً إلى false فيظهر البانر!
    DownloadBannerComponent.wasClosedInThisSession = true;
    console.log('🔒 تم حفظ حالة الإغلاق في كود التطبيق المباشر.');
  }

  private isAppInstalled(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = (window.navigator as any).standalone === true;
    return isStandalone || isNavigatorStandalone;
  }
}