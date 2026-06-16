import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hadith-menu',
  standalone: true,
  imports: [CommonModule , RouterLink, RouterLinkActive],
  templateUrl: './hadith-menu.component.html',
  styleUrl: './hadith-menu.component.css'
})
export class HadithMenuComponent {

}

