import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import {  hadithDetails, hadithImportanceList, hadithFawaedList, hadithFawaed1, hadithFawaed2} from './hadith6-data';

@Component({
  selector: 'app-nawawi-6',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-6.component.html'
})
export class Nawawi6Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;
  box3Items = hadithFawaed1;
  box4Items = hadithFawaed2;
}