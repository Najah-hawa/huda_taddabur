import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class FiqhMenuComponent {
  // الكود الخاص بك هنا
}