import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuranPartsComponent } from './components/parts/quran-parts/quran-parts.component';
import { AlfatihaComponent} from './components/alfatiha/alfatiha.component';
import { SurahHintComponent } from './components/surah-hint/surah-hint.component';
import { FawaedOfSurahComponent } from './components/fawaed-of-surah/fawaed-of-surah.component';
import { NezzolComponent } from './components/nezzol/nezzol.component';
import { QuixTafserComponent } from './components/quix-tafser/quix-tafser.component';
import { FooterInfoComponent } from './components/footer-info/footer-info.component';
import { JuzAmmaSurahsListComponent } from './components/parts/juz-30/juz-amma-surahs-list/juz-amma-surahs-list.component';
import { Surah78Component } from './components/parts/juz-30/surah-78/surah-78.component';
import { Component } from '@angular/core';
export const routes: Routes = [
  {path: 'home', component: HomeComponent },  // الصفحة الرئيسية
  {path: 'app-quran-parts', component: QuranPartsComponent },
  {path: 'alfatiha', component: AlfatihaComponent},
  {path: 'faida', component: FawaedOfSurahComponent},
  {path: 'SurahHint', component: SurahHintComponent},
  {path: 'nezzol', component: NezzolComponent},
  {path: 'quiz', component: QuixTafserComponent}, 
  {path: 'footer', component: FooterInfoComponent},
  {path:'juz-amma', component: JuzAmmaSurahsListComponent},
  {path:'surah-78', component:Surah78Component},
  {path: '', redirectTo: '/home', pathMatch: 'full' }  // أي رابط خطأ يرجع لـ home
];

  