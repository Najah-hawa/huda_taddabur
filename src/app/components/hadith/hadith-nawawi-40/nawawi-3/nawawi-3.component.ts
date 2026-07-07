import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import { hadithDetails, hadithImportanceList } from './hadith3-data';

@Component({
  selector: 'app-nawawi-3',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-3.component.html'
})
export class Nawawi3Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;

}