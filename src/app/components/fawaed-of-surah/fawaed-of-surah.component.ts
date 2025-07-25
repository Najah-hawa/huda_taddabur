import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
@Component({
  selector: 'app-fawaed-of-surah',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fawaed-of-surah.component.html',
  styleUrl: './fawaed-of-surah.component.css'
})
export class FawaedOfSurahComponent {
  @Input() SurahFaidah: string = '';
  @Input() FaidaText: string = '';
  
}


