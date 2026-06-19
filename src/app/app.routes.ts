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
  {
    path: 'surah-84',
    loadComponent: () => import('./components/parts/juz-30/surah-84/surah-84.component').then(m => m.Surah84Component)
  },

// ⬇️ هنا نقوم بإضافة مسارات الفقه الجديدة بأسلوب الـ Lazy Loading ⬇️
  {
    path: 'fiqh',
    loadComponent: () => import('./components/fiqh/fiqh-menu/fiqh-menu.component').then(m => m.FiqhMenuComponent)
  },
  {
    path: 'fiqh/purity',
    loadComponent: () => import('./components/fiqh/purity-fiqh/purity-fiqh.component').then(m => m.PurityFiqhComponent)
  },

// ⬇️ هنا نقوم بإضافة مسارات الحديث الجديدة بأسلوب الـ Lazy Loading ⬇️
  {
    path: 'hadith',
    loadComponent: () => import('./components/hadith/hadith-menu/hadith-menu.component').then(m => m.HadithMenuComponent)
  },
  {
    path: 'hadith/nawawi-1',
    loadComponent: () => import('./components/hadith/nawawi-1/nawawi-1.component').then(m => m.Nawawi1Component)
  },
   {
    path: 'hadith/nawawi-2',
    loadComponent: () => import('./components/hadith/nawawi-2/nawawi-2.component').then(m => m.Nawawi2Component)
  },
  {
    path: 'hadith/nawawi-3',
    loadComponent: () => import('./components/hadith/nawawi-3/nawawi-3.component').then(m => m.Nawawi3Component)
  },
  {
    path: 'hadith/nawawi-4',
    loadComponent: () => import('./components/hadith/nawawi-4/nawawi-4.component').then(m => m.Nawawi4Component)
  },
  {
    path: 'hadith/nawawi-5',
    loadComponent: () => import('./components/hadith/nawawi-5/nawawi-5.component').then(m => m.Nawawi5Component)
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];