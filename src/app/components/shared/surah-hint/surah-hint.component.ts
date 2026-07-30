import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
@Component({
  selector: 'app-surah-hint',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './surah-hint.component.html',
  styleUrl: './surah-hint.component.css'
})
export class SurahHintComponent {
  @Input() surahName: string = '';
  @Input() hintText: string = '';
}



