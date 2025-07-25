import { Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surah-tabs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './surah-tabs.component.html',
  styleUrl: './surah-tabs.component.css'
})

export class SurahTabsComponent {
@Input() surahName: string = ''; // متغير لقبول اسم السورة من الأب
  
  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';

  selectTab(tab: 'tadabbur' | 'visual') {
  this.selectedTab = tab;
  }
}


