
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nezzol',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nezzol.component.html',
  styleUrl: './nezzol.component.css'
})


export class NezzolComponent {

  @Input() dalel: string = '';
  @Input() nezoolText: string = '';
}