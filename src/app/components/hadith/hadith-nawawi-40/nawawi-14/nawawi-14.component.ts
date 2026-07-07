import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithViewComponent } from '../hadith-view/hadith-view.component'; // تأكدي من صحة المسار التنسيقي
import {  hadithDetails, hadithImportanceList, hadithFawaedList } from './hadith-14-data';

@Component({
  selector: 'app-nawawi-5',
  standalone: true,
  imports: [CommonModule, HadithViewComponent],
  templateUrl: './nawawi-14.component.html'
})
export class Nawawi14Component {
  hadith = hadithDetails;
  box1Items = hadithImportanceList;
  box2Items = hadithFawaedList;
}