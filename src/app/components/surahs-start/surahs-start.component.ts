import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-surahs-start',
  imports: [RouterModule, CommonModule],
  templateUrl: './surahs-start.component.html',
  styleUrl: './surahs-start.component.css'
})
export class SurahsStartComponent {

bismillahShown = false;
AwzobillahShown = false;
shown: boolean[] = [];

expandedSections: { [key: number]: boolean } = {};

toggleExpanded(index: number) {
  this.expandedSections[index] = !this.expandedSections[index];
}


  toggleBismillah() {
    this.bismillahShown = !this.bismillahShown;
  }

  toggleAwzoBillah() {
    this.AwzobillahShown = !this.AwzobillahShown;
  }
  toggleVerse(index: number) {
    this.shown[index] = !this.shown[index];
  }


}
