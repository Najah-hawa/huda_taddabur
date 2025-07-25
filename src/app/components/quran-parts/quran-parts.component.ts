import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
@Component({
  selector: 'app-quran-parts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quran-parts.component.html',
  styleUrl: './quran-parts.component.css'
})
export class QuranPartsComponent {

}


