import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
@Component({
  selector: 'app-next-before-surah-meny',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './next-before-surah-meny.component.html',
  styleUrl: './next-before-surah-meny.component.css'
})
export class NextBeforeSurahMenyComponent {
  constructor( public langService: LanguageService) {}
  @Input() SurahBefore: string = '';
  @Input() SurahNext: string = '';
  @Input() RoutelinkBefore: string = '';
  @Input() RoutelinkAfter: string = '';
  
  // 🌟 إضافة رابط القائمة بالمنتصف (افتراضياً يذهب للقائمة الرئيسية)
  @Input() MenuRoute: string = '/hadith/ryad-alsalihin'; 
}