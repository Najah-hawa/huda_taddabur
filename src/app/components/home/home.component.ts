import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // 👈 ضروري لتشتغل routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // 👈 لازم يكون اسمها style**Urls**
})
export class HomeComponent {}
