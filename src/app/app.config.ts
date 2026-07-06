// 1. قمنا بإضافة ErrorHandler داخل القوسين في السطر الأول هنا 👇
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { GlobalErrorHandler } from './global-error-handler'; // تأكدي من صحة المسار

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // التوجيه الأول
    provideHttpClient(), 
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
    // ملاحظة: قمت بحذف تكرار provideRouter(routes) الزائد ليكون الكود أنظف
    
    // تفعيل معالج الأخطاء العالمي الخاص بنا 👇
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};