import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { DownloadBannerComponent } from './components/download-banner/download-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, // ✅ behövs för routerLinkActive
    FormsModule, // Add FormsModule here to enable ngModel
    DownloadBannerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'huda&taddabur';
}
