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

  // ⬇️ هنا نقوم بإضافة مسارات المسابقات الجديدة بأسلوب الـ Lazy Loading ⬇️
  {
    path: 'quiz',
    loadComponent: () => import('./components/quiz/quiz-menu/quiz-menu.component').then(m => m.QuizMenuComponent)
  },
  {
    path: 'quiz/mohamad-family',
    loadComponent: () => import('./components/quiz/mohamad-family/mohamad-family.component').then(m => m.MohamadFamilyComponent)
  },
// ⬇️ هنا نقوم بإضافة مسارات الحديث الجديدة بأسلوب الـ Lazy Loading ⬇️
  {
    path: 'hadith',
    loadComponent: () => import('./components/hadith/ryad-nawawi-menu/ryad-nawawi-menu.component').then(m => m.RyadNawawiMenuComponent)
  },
  {
    path: 'hadith/hadith-menu',
    loadComponent: () => import('./components/hadith/hadith-menu/hadith-menu.component').then(m => m.HadithMenuComponent)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-1',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-1/nawawi-1.component').then(m => m.Nawawi1Component)
  },
   {
    path: 'hadith/hadith-nawawi-40/nawawi-2',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-2/nawawi-2.component').then(m => m.Nawawi2Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-3',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-3/nawawi-3.component').then(m => m.Nawawi3Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-4',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-4/nawawi-4.component').then(m => m.Nawawi4Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-5',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-5/nawawi-5.component').then(m => m.Nawawi5Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-6',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-6/nawawi-6.component').then(m => m.Nawawi6Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-7',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-7/nawawi-7.component').then(m => m.Nawawi7Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-8',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-8/nawawi-8.component').then(m => m.Nawawi8Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-9',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-9/nawawi-9.component').then(m => m.Nawawi9Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-10',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-10/nawawi-10.component').then(m => m.Nawawi10Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-11',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-11/nawawi-11.component').then(m => m.Nawawi11Component)
  },
  {
    path: 'hadith/hadith-nawawi-40/nawawi-12',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/nawawi-12/nawawi-12.component').then(m => m.Nawawi12Component)
  },
  {
    path: 'hadith/ryad-alsalihin',
    loadComponent: () => import('./components/hadith/ryad-alsalihin/ryad-alsalihin.component').then(m => m.RyadAlsalihinComponent)
  },
  {
    path: 'hadith/ryad/bab-1',
    loadComponent: () => import('./components/hadith/ryad/bab-1/bab-1.component').then(m => m.Bab1Component)
  },
  {
    path: 'hadith/ryad/intro',
    loadComponent: () => import('./components/hadith/ryad/bab-1/intro/intro.component').then(m => m.IntroComponent)
  },
  {
    path: 'hadith/ryad/nawawi-intro',
    loadComponent: () => import('./components/hadith/ryad/bab-1/nawawi-intro/nawawi-intro.component').then(m => m.NawawiIntroComponent)
  },
  
  {
    path: 'hadith/ryad/hadith-1',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-1/hadith-1.component').then(m => m.Hadith1Component)
  },
   {
    path: 'hadith/ryad/hadith-2',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-2/hadith-2.component').then(m => m.Hadith2Component)
  },
   {
    path: 'hadith/ryad/hadith-3',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-3/hadith-3.component').then(m => m.Hadith3Component)
  },
   {
    path: 'hadith/ryad/hadith-4',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-4/hadith-4.component').then(m => m.Hadith4Component)
  },
   {
    path: 'hadith/ryad/hadith-5',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-5/hadith-5.component').then(m => m.Hadith5Component)
  },
   {
    path: 'hadith/ryad/hadith-6',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-6/hadith-6.component').then(m => m.Hadith6Component)
  },
   {
    path: 'hadith/ryad/hadith-7',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-7/hadith-7.component').then(m => m.Hadith7Component)
  },
   {
    path: 'hadith/ryad/hadith-8',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-8/hadith-8.component').then(m => m.Hadith8Component)
  },
   {
    path: 'hadith/ryad/hadith-9',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-9/hadith-9.component').then(m => m.Hadith9Component)
  },
   {
    path: 'hadith/ryad/hadith-10',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-10/hadith-10.component').then(m => m.Hadith10Component)
  },
   {
    path: 'hadith/ryad/hadith-11',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-11/hadith-11.component').then(m => m.Hadith11Component)
  },
   {
    path: 'hadith/ryad/hadith-12',
    loadComponent: () => import('./components/hadith/ryad/bab-1/hadith-12/hadith-12.component').then(m => m.Hadith12Component)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];