import { Component, Input  } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
@Component({
  selector: 'app-next-before-surah-meny',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './next-before-surah-meny.component.html',
  styleUrl: './next-before-surah-meny.component.css'
})
export class NextBeforeSurahMenyComponent {
 @Input() SurahBefore: string = '';
 @Input() SurahNext: string = '';
 @Input() RoutelinkBefore : string = '';
 @Input() RoutelinkAfter : string = '';
}



