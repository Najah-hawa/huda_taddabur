// قمنا بإضافة importProvidersFrom في نهاية السطر الأول هنا
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Här ger vi routerkonfigurationen
    provideHttpClient()  // HTTP-klienten
  
  ]
};