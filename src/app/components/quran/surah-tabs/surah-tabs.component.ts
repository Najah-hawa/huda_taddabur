
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; //
@Component({
  selector: 'app-surah-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './surah-tabs.component.html',
  styleUrl: './surah-tabs.component.css'
})
export class SurahTabsComponent {
  @Input() surahName!: string;
  @Output() tabChanged = new EventEmitter<'tadabbur' | 'visual'>();

  selectedTab: 'tadabbur' | 'visual' = 'tadabbur';

  selectTab(tab: 'tadabbur' | 'visual') {
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }
}
