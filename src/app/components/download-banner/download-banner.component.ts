import { Component, OnInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-banner.component.html',
  styleUrl: './download-banner.component.css'
})
export class DownloadBannerComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isExpanded: boolean = false;      
  isPocketHidden: boolean = false;  
  isAlreadyInstalled: boolean = false; 

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  private static wasClosedInThisSession = false;

  ngOnInit() {
    if (this.isAppInStandaloneMode()) {
      this.isPocketHidden = true;
      return;
    }

    this.checkIfAppInstalledBefore();

    if (DownloadBannerComponent.wasClosedInThisSession) {
      this.isPocketHidden = true;
      return;
    }

    setTimeout(() => {
      if (!this.isPocketHidden) {
        this.isExpanded = true;
        this.cdr.detectChanges();
      }
    }, 2000);
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    e.preventDefault();
    
    if (this.isAppInStandaloneMode()) {
      this.isPocketHidden = true;
      return;
    }
    
    this.deferredPrompt = e;
    this.showInstallButton = true;
    this.isAlreadyInstalled = false; 
    this.cdr.detectChanges();
  }

  @HostListener('window:appinstalled', ['$event'])
  onAppInstalled() {
    this.isAlreadyInstalled = true;
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    localStorage.setItem('pwa_installed_status', 'true'); 
    this.cdr.detectChanges();
  }

  downloadApp(event: Event) {
    event.preventDefault();
    if (this.isAlreadyInstalled) return; 
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.isPocketHidden = true;
        this.isExpanded = false;
        this.isAlreadyInstalled = true;
        DownloadBannerComponent.wasClosedInThisSession = true;
        localStorage.setItem('pwa_installed_status', 'true');
      }
      this.deferredPrompt = null;
      this.cdr.detectChanges();
    });
  }

  // 👈 Här har vi bytt namn på funktionen till triggerBannerToggle
  triggerBannerToggle() {
    this.isExpanded = !this.isExpanded;
    this.cdr.detectChanges();
  }

  closePocketComplete(event: Event) {
    event.stopPropagation();
    this.isPocketHidden = true;
    this.isExpanded = false;
    DownloadBannerComponent.wasClosedInThisSession = true;
    this.cdr.detectChanges();
  }

  private isAppInStandaloneMode(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = (window.navigator as any).standalone === true;
    return isStandalone || isNavigatorStandalone;
  }

  private checkIfAppInstalledBefore() {
    const localStatus = localStorage.getItem('pwa_installed_status');
    if (localStatus === 'true') {
      this.isAlreadyInstalled = true;
    }
  }
}