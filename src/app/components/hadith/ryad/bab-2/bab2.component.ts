import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

@Component({
  selector: 'app-bab2',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './bab2.component.html',
  styleUrl: './bab2.component.css'
})
export class Bab2Component implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

ngOnInit() {
  // Sätt sidans huvudtitel för Riyad al-Salihin - Bab 2: Om ånger
  this.titleService.setTitle('باب التوبة - رياض الصالحين | شرح وتدبر أحاديث التوبة');

  // Sätt meta-taggar för sökmotorer (SEO)
  this.metaService.updateTag({ 
    name: 'description', 
    content: 'تصفح وقرأ أحاديث باب التوبة من كتاب رياض الصالحين كاملة، مع الشرح والفوائد المستخرجة وتدبر شروط التوبة النصوح.' 
  });
  this.metaService.updateTag({ 
    name: 'keywords', 
    content: 'رياض الصالحين, باب التوبة, أحاديث التوبة, الاستغفار, شروط التوبة, التوبة النصوح, أحاديث نبوية, هدى وتدبر' 
  });

  // Open Graph för sociala medier och WhatsApp-delning
  this.metaService.updateTag({ property: 'og:title', content: 'باب التوبة - رياض الصالحين | منصة هدى وتدبر التفاعلية' });
  this.metaService.updateTag({ property: 'og:description', content: 'اقرأ وتدبر أحاديث باب التوبة من رياض الصالحين مع شروحات مبسطة وفوائد إيمانية وعملية.' });
  this.metaService.updateTag({ property: 'og:type', content: 'website' });
}
}
