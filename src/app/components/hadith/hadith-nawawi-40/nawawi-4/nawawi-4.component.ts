import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import {  hadithDetails, hadithImportanceList, hadithFawaedList } from './hadith4-data';

@Component({
  selector: 'app-nawawi-4',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-4.component.html'
})
export class Nawawi4Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;
}