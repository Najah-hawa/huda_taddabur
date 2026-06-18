import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// 1. Lägg till importen här:
import { inject } from '@vercel/analytics';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // 2. Starta Vercel Analytics när appen har startat helt:
    inject();
  })
  .catch((err) => console.error(err));