import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Arabiska länder där knappen INTE ska visas (exklusive UAE 'AE')
  private strictlyArabicCountries = [
    'SY', 'SA', 'EG', 'IQ', 'JO', 'KW', 'LB', 'OM', 'QA', 'BH', 'DZ', 'MA', 'TN', 'LY', 'SD', 'YE'
  ];
  
  // Signal för valt språk
  public currentLang = signal<Language>('ar');
  
  // Signal för om språkväljarknappen ska visas i UI
  public showLangSwitcher = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  public initAppLanguage(): void {
  const savedLang = localStorage.getItem('app_user_lang') as Language;
  console.log('1. Sparat språk i localStorage:', savedLang);

  if (savedLang) {
    this.setLanguage(savedLang);
    this.showLangSwitcher.set(true);
    console.log('2. Hittade sparat språk -> Visar knappen');
    return;
  }

  this.http.get<any>('https://ipapi.co/json/').subscribe({
    next: (res) => {
      console.log('3. IP API svarade:', res);
      const countryCode = res.country_code;
      console.log('4. Detekterad landskod:', countryCode);
      
      if (this.strictlyArabicCountries.includes(countryCode)) {
        this.setLanguage('ar');
        this.showLangSwitcher.set(false);
        console.log('5. Arabiskt land -> Döljer knappen');
      } else {
        this.setLanguage('en');
        this.showLangSwitcher.set(true);
        console.log('5. EU/UAE land -> Visar knappen');
      }
    },
    error: (err) => {
      console.error('3. IP API misslyckades (Blockerat/CORS):', err);
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
      this.setLanguage(browserLang);
      this.showLangSwitcher.set(true);
      console.log('4. Fallback aktiverad -> Visar knappen');
    }
  });
}
setLanguage(lang: 'ar' | 'en') {
  this.currentLang.set(lang);
  localStorage.setItem('lang', lang);

  // 🌟 Sätter richtningen på hela <html>-taggen i webbläsaren
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

 public toggleLanguage(): void {
  const nextLang = this.currentLang() === 'ar' ? 'en' : 'ar';
  console.log('Växlar språk till:', nextLang); // 👈 Testutskrift
  this.setLanguage(nextLang);
}
}