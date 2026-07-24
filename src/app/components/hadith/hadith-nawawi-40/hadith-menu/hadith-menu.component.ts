import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

@Component({
  selector: 'app-hadith-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './hadith-menu.component.html',
  styleUrl: './hadith-menu.component.css'
})



export class HadithMenuComponent implements OnInit { // Implementera OnInit
  categoryKey: string = 'hadith-nawawi-40';
  titleHeader: string = 'احاديث الأربعين النووية';

  // القائمة المعروضة حالياً في الـ HTML
  hadithNamesList: string[] = [];

  // 📚1. قائمة الأربعين النووية
  nawawiList: string[] = [
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

  // 📚 2. قائمة رياض الصالحين - باب 1
  ryadBab1List: string[] = [
    'مقدمة باب الاخلاص واحضار النيه في جميع الاعمال والاحوال ',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
    'الحديث الثامن',
    'الحديث التاسع',
    'الحديث العاشر',
    'الحديث الحادي عشر',
    'الحديث الثاني عشر'
  ];

  // 📚 3. قائمة رياض الصالحين - باب 2
  ryadBab2List: string[] = [
    'الحديث الأول: الصبر',
    'الحديث الثاني: الصدق',
    // ... باقي قائمة باب 2
  ];



constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // نقرأ التصنيف من الرابط، وإذا لم يوجد نأخذ الأربعين النووية كافتراضي
      this.categoryKey = params.get('category') || 'hadith-nawawi-40';
      this.selectMenuList(this.categoryKey);
    });
  }
  // دالة لاختيار القائمة والعنوان المناسب بناءً على التصنيف
  selectMenuList(category: string) {
    switch (category) {
      case 'ryad-alsalihin':
      case 'ryad-bab-1':
        this.titleHeader = 'رياض الصالحين - باب الإخلاص';
        this.hadithNamesList = this.ryadBab1List;
        break;

      case 'ryad-bab-2':
        this.titleHeader = 'رياض الصالحين - باب الصبر';
        this.hadithNamesList = this.ryadBab2List;
        break;

      case 'hadith-nawawi-40':
      default:
        this.titleHeader = 'احاديث الأربعين النووية';
        this.hadithNamesList = this.nawawiList;
        break;
    }
  }
}