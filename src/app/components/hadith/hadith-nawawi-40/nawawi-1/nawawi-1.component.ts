import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import { hadith1Questions, hadithDetails, hadithImportanceList } from './hadith-data';

@Component({
  selector: 'app-nawawi-1',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-1.component.html'// 👈 أعدنا الإشارة لملف الـ HTML الخارجي هنا,
})
export class Nawawi1Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  hadith1Questions = hadith1Questions;
}