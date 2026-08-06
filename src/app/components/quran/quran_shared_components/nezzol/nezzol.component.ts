
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';
@Component({
  selector: 'app-nezzol',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nezzol.component.html',
  styleUrl: './nezzol.component.css'
})


export class NezzolComponent {
  constructor( public langService: LanguageService) {}
  @Input() dalel: string = '';
  @Input() nezoolText: string = '';

}