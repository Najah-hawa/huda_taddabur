import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
@Component({
  selector: 'app-footer-info',
  imports: [],
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.css'
})
export class FooterInfoComponent {
  constructor( public langService: LanguageService) {}
  email = 'najah.hawa@gmail.com';
  currentYear: number = new Date().getFullYear();
}
