import { Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'surah/:category/:id',
    loadComponent: () => import('./components/quran/surah-view/surah-view.component').then(m => m.SurahViewComponent)
  },
  // För enstaka suror som Alfatiha om den inte har ett id under en kategori:
  {
    path: 'surah/:category',
    loadComponent: () => import('./components/quran/surah-view/surah-view.component').then(m => m.SurahViewComponent)
  },/*
  { path: 'juz-amma', component: JuzAmmaSurahsListComponent },
*/
  // Här använder vi Lazy Loading för surorna
  { 
    path: 'app-quran-parts', 
    loadComponent: () => import('./components/quran/quran_shared_components/quran-parts/quran-parts.component').then(m => m.QuranPartsComponent) 
  },
  // Lägg till alfatiha här:
  /*
  { 
    path: 'alfatiha', 
    loadComponent: () => import('./components/quran/alfatiha/alfatiha.component').then(m => m.AlfatihaComponent) 
  },
  {
    path: 'surah-78',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-78/surah-78.component').then(m => m.Surah78Component) 
  },
  {
    path: 'surah-79',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-79/surah-79.component').then(m => m.Surah79Component)
  },
  {
    path: 'surah-80',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-80/surah-80.component').then(m => m.Surah80Component)
  },
  {
    path: 'surah-81',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-81/surah-81.component').then(m => m.Surah81Component)
  },
  {
    path: 'surah-82',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-82/surah-82.component').then(m => m.Surah82Component)
  },
  {
    path: 'surah-83',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-83/surah-83.component').then(m => m.Surah83Component)
  },
  {
    path: 'surah-84',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-84/surah-84.component').then(m => m.Surah84Component)
  },
    {
    path: 'surah-85',
    loadComponent: () => import('./components/quran/parts/juz-30/surah-85/surah-85.component').then(m => m.Surah85Component)
  },*/

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

  // 2. Om man skriver 'hadith/hadith-menu' (gamla länken) -> Omdirigera till nya menyn
  {
    path: 'hadith/hadith-menu',
    redirectTo: 'hadith/hadith-nawawi-40/menu',
    pathMatch: 'full'
  },

  {
    path: 'hadith/ryad-alsalihin',
    loadComponent: () => 
      import('./components/hadith/ryad-alsalihin-bab-menu/ryad-alsalihin.component')
        .then(m => m.RyadAlsalihinComponent)
  },
  {
    path: 'hadith/nawawi-intro',
    redirectTo: 'hadith/nawawi-intro/1',
    pathMatch: 'full'
  },
  {
    path: 'hadith/nawawi-intro/menu',
    redirectTo: 'hadith/nawawi-intro/1',
    pathMatch: 'full'
  },
  // 🔄 3. DYNAMISK OMDIRIGERNG: Om man går till t.ex. 'hadith/ryad-bab-1' -> Omdirigera till 'hadith/ryad-bab-1/menu'
  {
    path: 'hadith/:category',
    redirectTo: 'hadith/:category/menu',
    pathMatch: 'full'
  },

  // 📋 4. Menyn för vilken bab/kategori som helst
  {
    path: 'hadith/:category/menu',
    loadComponent: () => 
      import('./components/hadith/hadith-menu/hadith-menu.component')
        .then(m => m.HadithMenuComponent)
  },

  // 📖 5. Visning av en specifik hadith för vilken bab/kategori som helst
  {
    path: 'hadith/:category/:id',
    loadComponent: () => 
      import('./components/hadith/hadith-view/hadith-view.component')
        .then(m => m.HadithViewComponent)
  }, 

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];