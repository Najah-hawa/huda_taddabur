import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JuzAmmaSurahsListComponent } from './components/parts/juz-30/juz-amma-surahs-list/juz-amma-surahs-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'juz-amma', component: JuzAmmaSurahsListComponent },

  // Här använder vi Lazy Loading för surorna
  { 
    path: 'app-quran-parts', 
    loadComponent: () => import('./components/parts/quran-parts/quran-parts.component').then(m => m.QuranPartsComponent) 
  },
  // Lägg till alfatiha här:
  { 
    path: 'alfatiha', 
    loadComponent: () => import('./components/alfatiha/alfatiha.component').then(m => m.AlfatihaComponent) 
  },
  {
    path: 'surah-78',
    loadComponent: () => import('./components/parts/juz-30/surah-78/surah-78.component').then(m => m.Surah78Component) 
  },
  {
    path: 'surah-79',
    loadComponent: () => import('./components/parts/juz-30/surah-79/surah-79.component').then(m => m.Surah79Component)
  },
  {
    path: 'surah-80',
    loadComponent: () => import('./components/parts/juz-30/surah-80/surah-80.component').then(m => m.Surah80Component)
  },
  {
    path: 'surah-81',
    loadComponent: () => import('./components/parts/juz-30/surah-81/surah-81.component').then(m => m.Surah81Component)
  },
  {
    path: 'surah-82',
    loadComponent: () => import('./components/parts/juz-30/surah-82/surah-82.component').then(m => m.Surah82Component)
  },
  {
    path: 'surah-83',
    loadComponent: () => import('./components/parts/juz-30/surah-83/surah-83.component').then(m => m.Surah83Component)
  },
  // ... fortsätt likadant för resten
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];