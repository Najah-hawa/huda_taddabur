import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import {  hadithDetails, hadithImportanceList, hadithFawaedList, hadithFawaed1 } from './hadith-16-data';

@Component({
  selector: 'app-nawawi-5',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-16.component.html'
})
export class Nawawi16Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;
  box3Items = hadithFawaed1;
}