import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HadithStatus = 'completed' | 'review' | 'not-started';

@Component({
  selector: 'app-status-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-banner.component.html',
  styleUrl: './status-banner.component.css'
})
export class StatusBannerComponent {
  // Current status passed from parent
  currentStatus = input<HadithStatus>('not-started');
  
  // Event emitted when user selects a status
  statusChange = output<HadithStatus>();

  selectStatus(status: HadithStatus): void {
    this.statusChange.emit(status);
  }
}