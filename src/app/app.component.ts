import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DownloadBannerComponent } from "./components/download-banner/download-banner.component"; 
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker'; // 1. استيراد خدمة السيرفس وركر
import { filter } from 'rxjs/operators'; // 2. استيراد الفلتر لمراقبة التحديثات

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, // ✅ behövs för routerLinkActive
    FormsModule, // Add FormsModule here to enable ngModel
    DownloadBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'هدى وتدبر';

  // 3. قمنا بحقن swUpdate داخل الـ constructor بجانب الخدمات الأخرى
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private swUpdate: SwUpdate 
  ) {}

  ngOnInit() {
    // الكود القديم لعنوان الصفحة
    this.titleService.setTitle('هدى وتدبر - الرئيسية');

    // 4. كود مراقبة التحديثات وإعادة تحميل الصفحة فوراً عند وجود نسخة جديدة
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      ).subscribe(() => {
        // إعادة تحميل تلقائية لتطبيق التحديث فوراً للأصوات والملفات الجديدة
        window.location.reload();
      });
    }
  }
}