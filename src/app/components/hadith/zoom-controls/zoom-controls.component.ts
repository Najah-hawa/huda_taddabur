import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zoom-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zoom-controls.component.html',
  styleUrl: './zoom-controls.component.css'
})
export class ZoomControlsComponent {
  // 📥 استقبال حالة التكبير من المكوّن الأب (هل الصندوق في وضع ملء الشاشة؟)
  @Input() isMaximized: boolean = false;

  // 📤 إرسال أحداث الضغط إلى المكوّن الأب ليقوم بالتحكم في أحجامه الخاصة
  @Output() onToggle = new EventEmitter<void>();
  @Output() onZoomIn = new EventEmitter<void>();
  @Output() onZoomOut = new EventEmitter<void>();
}