import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
// 1. قم باستيراد الـ RouterLink والـ RouterLinkActive هنا ⬇️
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-fiqh-menu',
  standalone: true,
  // 2. أضفهم هنا داخل مصفوفة الـ imports لتفعيل الروابط في الـ HTML ⬇️
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './fiqh-menu.component.html',
  styleUrls: ['./fiqh-menu.component.css']
})
export class FiqhMenuComponent implements OnInit {
  
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // 🏷️ تعيين عنوان الصفحة لقسم الفقه
    this.titleService.setTitle('دليل مباحث الفقه الإسلامي - تبسيط وتقريب الأحكام الشرعية');

    // 🌐 وسوم الميتا الأساسية للسيو (Meta Tags)
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تصفح قائمة مباحث الفقه الإسلامي الميسر. يتضمن القسم شرحاً شاملاً لأحكام العبادات، المعاملات، وفقه الأسرة بطريقة معاصرة وتبسيط تفاعلي.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'الفقه الإسلامي, فقه العبادات, الأحكام الشرعية, الفقه الميسر, تعليم الفقه, قائمة دروس الفقه' 
    });
    
    // 📱 وسوم الميتا الخاصة بشبكات التواصل الاجتماعي (Open Graph)
    this.metaService.updateTag({ property: 'og:title', content: 'دليل مباحث الفقه الإسلامي الميسر' });
    this.metaService.updateTag({ property: 'og:description', content: 'دليلك الشامل لتعلم الفقه الإسلامي وأحكامه الشرعية بسهولة ويسر عبر أدوات تفاعلية معاصرة.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

}