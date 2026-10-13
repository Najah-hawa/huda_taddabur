import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

@Component({
  selector: 'app-ryad-alsalihin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './ryad-alsalihin.component.html',
  styleUrl: './ryad-alsalihin.component.css'
})
export class RyadAlsalihinComponent { // Implementera OnInit
babsList = [
    { id: 'nawawi-intro', title: 'مقدمة عن الإمام النووي' },
    { id: 'ryad-bab-1', title: 'باب الإخلاص وإحضار النية' },
    { id: 'ryad-bab-2', title: 'باب التوبة' },
    { id: 'ryad-bab-3', title: 'باب الصبر' }, 
    { id: 'ryad-bab-4', title: 'باب الصدق' }, 
    { id: 'ryad-bab-5', title: 'باب المراقبة' }, 
    { id: 'ryad-bab-6', title: 'باب التقوى' }, 
    { id: 'ryad-bab-7', title: 'باب اليقين والتوكل' }, 
    { id: 'ryad-bab-8', title: 'باب الاستقامة' }, 
    { id: 'ryad-bab-9', title: 'باب التفكر في عظيم مخلوقات الله' }, 
    { id: 'ryad-bab-10', title: 'باب المبادرة إلى الخيرات' }, 
    // { id: 'ryad-bab-5', title: 'باب المراقبة' }, 
  ];


}