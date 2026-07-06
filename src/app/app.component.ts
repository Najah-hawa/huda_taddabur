import { Component, OnInit } from '@angular/core'; // ✅ التعديل الصحيح هنا من core
import { CommonModule } from '@angular/common'; // ✅ الـ CommonModule يأتي من common
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  title = 'هدى وتدبر';

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private swUpdate: SwUpdate 
  ) {}

  ngOnInit() {
    // 1. تحديث العنوان الخاص بالصفحة الرئيسية
    this.titleService.setTitle('هدى وتدبر - الرئيسية');

    // 2. استخدام الـ metaService لتحديث الأوسمة
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تطبيق هدى وتدبر - تفسير جزء عم بطريقة تفاعليه, عرض أحاديث رسول الله عليه الصلاة والسلام, مسابقات إسلامية تفاعلية للأطفال والكبار.' 
    });
    
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'هدى وتدبر, مسابقات إسلامية, أمهات المؤمنين, نسب الرسول, ألعاب أطفال تفاعلية, جزء عم تفسيرو أحاديث الأربعين النووية' 
    });

    // 3. تفعيل منظومة الفحص التلقائي والتحديث الفوري في الخلفية
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

  // دالة لتنشيط الكاش الجديد وعمل إنعاش للموقع فوراً
  private activateNewVersion() {
    this.swUpdate.activateUpdate().then(() => {
      console.log('✨ تم اكتشاف تحديث جديد وتثبيته بنجاح! جاري إنعاش التطبيق...');
      window.location.reload(); // تحديث الشاشة لتظهر التعديلات الجديدة فوراً
    });
  }
}