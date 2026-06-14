// قمنا بإضافة importProvidersFrom في نهاية السطر الأول هنا
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Här ger vi routerkonfigurationen
    provideHttpClient(),  // HTTP-klienten
    importProvidersFrom(
      NgxGoogleAnalyticsModule.forRoot('G-TQE5Z130WM'),
      NgxGoogleAnalyticsRouterModule
    )
  ]
};