import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // 1. أضفنا OnInit هنا
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { DownloadBannerComponent } from './components/download-banner/download-banner.component';
import { GoogleAnalyticsService } from 'ngx-google-analytics'; // الخدمة مستدعاة بنجاح عندكِ

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
  styleUrls: ['./app.component.css'] // تم تصحيح styleUrls (كانت styleUrls في كودكِ الأصلي وهي الأصح)
})
export class AppComponent implements OnInit { // 2. أضفنا implements OnInit
  title = 'huda&taddabur';

  // 3. حقن الخدمة داخل الـ Constructor لتبدأ المكتبة بالعمل فوراً
  constructor(private gaService: GoogleAnalyticsService) {}

  ngOnInit(): void {
    // 4. إرسال إشارة أولية لغوغل عند تشغيل التطبيق (الزيارة الأولى للموقع)
    this.gaService.pageView('/', 'Home Page');
  }
}