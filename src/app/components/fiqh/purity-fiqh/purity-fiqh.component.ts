import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purity-fiqh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purity-fiqh.component.html',
  styleUrls: ['./purity-fiqh.component.css']
})
export class PurityFiqhComponent {
  mainTitle = 'فقه الطهارة ';
  
  // التبويب الافتراضي عند فتح الصفحة
  activeTab: string = 'definition'; 

  setTab(tabName: string) {
    this.activeTab = tabName;
  }
}