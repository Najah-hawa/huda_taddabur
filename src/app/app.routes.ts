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
    {
    path: 'surah-85',
    loadComponent: () => import('./components/parts/juz-30/surah-85/surah-85.component').then(m => m.Surah85Component)
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
    {
    path: 'quiz/mohamad-wives',
    loadComponent: () => import('./components/quiz/mohamad-wives/mohamad-wives.component').then(m => m.MohamadWivesComponent)
  },
// ⬇️ هنا نقوم بإضافة مسارات الحديث الجديدة بأسلوب الـ Lazy Loading ⬇️
  {
    path: 'hadith',
    loadComponent: () => import('./components/hadith/ryad-nawawi-menu/ryad-nawawi-menu.component').then(m => m.RyadNawawiMenuComponent)
  },
  {
    path: 'hadith/hadith-menu',
    loadComponent: () => import('./components/hadith/hadith-nawawi-40/hadith-menu/hadith-menu.component').then(m => m.HadithMenuComponent)
  },
  {
  // :id تعني أن هذا الجزء من الرابط متغير (يمكن أن يكون 1، 2، 3 حتى 42)
  path: 'hadith/hadith-nawawi-40/:id',
  loadComponent: () => 
    import('./components/hadith/hadith-nawawi-40/hadith-view/hadith-view.component')
      .then(m => m.HadithViewComponent)
  },
  {
    path: 'hadith/ryad-alsalihin',
    loadComponent: () => import('./components/hadith/ryad/ryad-alsalihin-bab-menu/ryad-alsalihin.component').then(m => m.RyadAlsalihinComponent)
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
   {
    path: 'hadith/ryad/bab-2',
    loadComponent: () => import('./components/hadith/ryad/bab-2/bab2.component').then(m => m.Bab2Component)
  },
    {
    path: 'hadith/ryad/bab-2/intro',
    loadComponent: () => import('./components/hadith/ryad/bab-2/intro/intro.component').then(m => m.IntroComponent)
  },
  {
    path: 'hadith/ryad/bab-2/hadith-13',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-13/hadith-13.component').then(m => m.Hadith13Component)
  },
  {
    path: 'hadith/ryad/bab-2/hadith-14',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-14/hadith-14.component').then(m => m.Hadith14Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-15',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-15/hadith-15.component').then(m => m.Hadith15Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-16',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-16/hadith-16.component').then(m => m.Hadith16Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-17',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-17/hadith-17.component').then(m => m.Hadith17Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-18',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-18/hadith-18.component').then(m => m.Hadith18Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-19',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-19/hadith-19.component').then(m => m.Hadith19Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-20',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-20/hadith-20.component').then(m => m.Hadith20Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-21',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-21/hadith-21.component').then(m => m.Hadith21Component)
  },
   {
    path: 'hadith/ryad/bab-2/hadith-22',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-22/hadith-22.component').then(m => m.Hadith22Component)
  }
  ,
   {
    path: 'hadith/ryad/bab-2/hadith-23',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-23/hadith-23.component').then(m => m.Hadith23Component)
  }
  ,
   {
    path: 'hadith/ryad/bab-2/hadith-24',
    loadComponent: () => import('./components/hadith/ryad/bab-2/hadith-24/hadith-24.component').then(m => m.Hadith24Component)
  }
  ,
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];