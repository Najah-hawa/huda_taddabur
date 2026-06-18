import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DownloadBannerComponent } from "./components/download-banner/download-banner.component";  // Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, // ✅ behövs för routerLinkActive
    FormsModule // Add FormsModule here to enable ngModel
    ,
    DownloadBannerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'هدى وتدبر';

  // Vi injicerar Title och Meta i constructorn
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Här kan du sätta eller uppdatera titeln och meta-taggar programmatiskt
    this.titleService.setTitle('هدى وتدبر - الرئيسية');
  }
}