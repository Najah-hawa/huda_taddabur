import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

@Component({
  selector: 'app-hadith-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './hadith-menu.component.html',
  styleUrl: './hadith-menu.component.css'
})
export class HadithMenuComponent implements OnInit { // Implementera OnInit

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätt sidans huvudtitel för hadith-menyn
    this.titleService.setTitle('الأربعون النووية - شرح وتدبر أحاديث النبي ﷺ');

    // Sätt meta-taggar för sökmotorer
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تصفح وقرأ شرح الأربعون النووية كاملة مع الفوائد والتدبر الإيماني لأحاديث النبي صلى الله عليه وسلم.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'الأربعون النووية, أحاديث نبوية, شرح الحديث, الأعمال بالنيات, مراتب الدين, هدى وتدبر' 
    });

    // Open Graph för sociala medier och WhatsApp-delning
    this.metaService.updateTag({ property: 'og:title', content: 'الأربعون النووية - منصة هدى وتدبر التفاعلية' });
    this.metaService.updateTag({ property: 'og:description', content: 'اقرأ واستمع إلى متن الأربعين النووية مع شروحات مبسطة وفوائد مستخرجة لكل حديث.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }


  hadithNamesList: string[] = [
   'الحديث الأول: الأعمال بالنيات',
   'الحديث الثاني : مراتب الدين: الإسلام والإيمان والإحسان',
   'الحديث الثالث : أركان الإسلام ودعائمه العظام',
   'الحديث الرابع : أطور خلق الإنسان وخاتمته',
   'الحديث الخامس : إبطال المنكرات والبدع',
   'الحديث السادس : الحلال و الحرام',
   'الحديث السابع : الدين النصيحة',
   'الحديث الثامن : حرمة المسلم',
   'الحديث التاسع : الأخذ بالتيسير وترك التعسير',
   'الحديث العاشر : الحلال الطيب شرط القبول',
   'الحديث الحادي عشر : الأخذ باليقين والبعد عن الشبهات',
   'الحديث الثاني عشر : الاشتغال بما يفيد',
   'الحديث الثالث عشر : أخوة الإيمان و الإسلام',
   'الحديث الرابع عشر : حرمة دم المسلم',
   'الحديث الخامس عشر : من خصال الإيمان',
   'الحديث السادس عشر : النهي عن الغضب',
    'الحديث السابع عشر : عموم الاحسان',
     'الحديث الثامن عشر : تقوى الله تعالى وحسن الخلق',
      'الحديث التاسع عشر : عون الله تعالى وحفظه',
       'الحديث العشرون : الحياء من الايمان'
    
  ];

}