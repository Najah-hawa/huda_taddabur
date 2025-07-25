import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-info',
  imports: [],
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.css'
})
export class FooterInfoComponent {
  email = 'najah.hawa@gmail.com';
  currentYear: number = new Date().getFullYear();
}
