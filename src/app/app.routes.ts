import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuranPartsComponent } from './components/parts/quran-parts/quran-parts.component';
import { AlfatihaComponent} from './components/alfatiha/alfatiha.component';
import { SurahHintComponent } from './components/surah-hint/surah-hint.component';
import { FawaedOfSurahComponent } from './components/fawaed-of-surah/fawaed-of-surah.component';
import { NezzolComponent } from './components/nezzol/nezzol.component';
import { NextBeforeSurahMenyComponent } from './components/next-before-surah-meny/next-before-surah-meny.component';
import { QuixTafserComponent } from './components/quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from './components/footer-info/footer-info.component';
import { JuzAmmaSurahsListComponent } from './components/parts/juz-30/juz-amma-surahs-list/juz-amma-surahs-list.component';
import { Surah78Component } from './components/parts/juz-30/surah-78/surah-78.component';
import { Surah79Component } from './components/parts/juz-30/surah-79/surah-79.component';
import { Surah80Component } from './components/parts/juz-30/surah-80/surah-80.component';
import { Surah81Component } from './components/parts/juz-30/surah-81/surah-81.component';
import { Surah82Component } from './components/parts/juz-30/surah-82/surah-82.component';
import { Surah83Component } from './components/parts/juz-30/surah-83/surah-83.component';
import { Surah84Component } from './components/parts/juz-30/surah-84/surah-84.component';
import { Surah85Component } from './components/parts/juz-30/surah-85/surah-85.component';

import { Component } from '@angular/core';
export const routes: Routes = [
  {path: 'home', component: HomeComponent },  // الصفحة الرئيسية
  {path: 'app-quran-parts', component: QuranPartsComponent },
  {path: 'alfatiha', component: AlfatihaComponent},
  {path: 'faida', component: FawaedOfSurahComponent},
  {path: 'SurahHint', component: SurahHintComponent},
  {path: 'nezzol', component: NezzolComponent},
  {path: 'next-before-menu', component: NextBeforeSurahMenyComponent},
  {path: 'quiz', component: QuixTafserComponent}, 
  {path: 'footer', component: FooterInfoComponent},
  {path: 'juz-amma', component: JuzAmmaSurahsListComponent},
  {path: 'surah-78', component:Surah78Component},
  {path: 'surah-79', component:Surah79Component},
  {path: 'surah-80', component:Surah80Component},
  {path: 'surah-81', component:Surah81Component},
  {path: 'surah-82', component:Surah82Component},
  {path: 'surah-83', component:Surah83Component},
  {path: 'surah-84', component:Surah84Component}, 
  {path: 'surah-85', component:Surah85Component}, 
  {path: '', redirectTo: '/home', pathMatch: 'full' }  // أي رابط خطأ يرجع لـ home
];

  