import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    // عند عمل Reload للموقع (أول دخول)، نفتح الكرت الكبير تلقائياً بعد ثانيتين ليلفت الانتباه
    setTimeout(() => {
      // نفتح الكرت الكبير فقط إذا لم يقم المستخدم بإغلاق الجيب الصغير سرياً قبلها
      if (!this.isPocketHidden) {
        this.isExpanded = true;
      }
    }, 2000);
  }

  // دالة للتبديل بين الجيب الصغير والكرت الكبير
  toggleBanner() {
    this.isExpanded = !this.isExpanded;
  }

  // دالة مخصصة لإلغاء وإخفاء الجيب الصغير تماماً عند الضغط على الـ X الخاص به
  closePocketComplete(event: Event) {
    event.stopPropagation(); // مهم جداً لمنع فتح الكرت الكبير عند الضغط على X الجيب
    this.isPocketHidden = true;
    this.isExpanded = false;
  }
}