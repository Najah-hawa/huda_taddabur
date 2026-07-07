import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import {  hadithDetails, hadithImportanceList, hadithFawaedList } from './hadith2-data';

@Component({
  selector: 'app-nawawi-2',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-2.component.html'
})
export class Nawawi2Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;
}