import { Component, OnInit } from '@angular/core'; // Importera OnInit
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importera Title och Meta för SEO

@Component({
  selector: 'app-hadith-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './hadith-menu.component.html',
  styleUrl: './hadith-menu.component.css'
})



export class HadithMenuComponent implements OnInit { 
currentCategory: string = '';
isNawawi: boolean = false; // 🌟 متغير لمعرفة ما إذا كنا في الأربعين النووية
 
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
   'الحديث العشرون : الحياء من الايمان',
   'الحادي والعشرون : الاستقامة و الإيمان',
   'الثاني والعشرون : طريق الجنة',
   'الثالث والعشرون : من جوامع الخير', 
   'الرابع والعشرون :  الاء الله ونعمه على عباده',
   ' الخامس والعشرون : التنافس في عمل الخير',  
   ' السادس والعشرون : فضل الله تعالى وسعة رحمته',  
   ' السابع والعشرون : البر والاثم',  
   ' الثامن والعشرون : وجوب لزوم السنة و اجتناب البدع',  
   ' التاسع والعشرون : سبيل الجنة',  
    ' الثلاثون : حدود الله تعالى و حرماته',
    ' الحادي والثلاثون : حقيقة الزهد و ثمراته',
    ' الثاني والثلاثون : نفي الضرر في الاسلام',
    ' الثالث والثلاثون : أسس القضاء في الاسلام',
    ' الرابع والثلاثون : فرضية إزالة المنكر وبيان مراتبها',
    ' الخامس والثلاثون : أخوة الإسلام وحقوق المسلم',
    ' السادس والثلاثون:  جوامع الخير',
    ' السابع والثلاثون : عدل الله تعالى وفضله ورحمته',
    ' الثامن والثلاثون : وسائل القرب من الله تعالى ونيل محبته',
    ' التاسع والثلاثون : رفع الحرج في الإسلام',
    '  الاربعون: اغتنام الدنيا للفوز بالاخرة  ',
    ' الحادي الاربعون : اتباع شرع الله تعالى عماد الايمان',
    ' الثاني الاربعون : سعة مغفرة الله وجل ',
   

  ];


    nawawiIntro: string[] = [
 'مقدمة',
    ]
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
    'مقدمة باب التوبة ',
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

    // 📚 3 قائمة رياض الصالحين - باب  
  ryadBab3List: string[] = [
    'مقدمة باب الصبر ',
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
    'الحديث الثاني عشر', 
    'الحديث الثالث عشر',
    'الحديث الرابع عشر',
    'الحديث الخامس عشر',
    'الحديث السادس عشر',
    'الحديث السابع عشر',
    'الحديث الثامن عشر',
    'الحديث التاسع عشر',
    'الحديث العشرون',
    'الحديث الحادي والعشرون',
    'الحديث الثاني والعشرون',
    'الحديث الثالث والعشرون',
    'الحديث الرابع والعشرون',
    'الحديث الخامس والعشرون',
    'الحديث السادس والعشرون',
    'الحديث السابع والعشرون',
    'الحديث الثامن والعشرون',
    'الحديث التاسع والعشرون',
  ];

    // 📚 4 قائمة رياض الصالحين - باب  
  ryadBab4List: string[] = [
    'مقدمة باب  ',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
    'الحديث الثامن',
    'الحديث التاسع',
    'الحديث العاشر',    /*
    'الحديث الحادي عشر',
    'الحديث الثاني عشر'*/
  ];


constructor(private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // نقرأ التصنيف من الرابط، وإذا لم يوجد نأخذ الأربعين النووية كافتراضي
      this.categoryKey = params.get('category') || 'hadith-nawawi-40';
      this.selectMenuList(this.categoryKey);
      // Hämtar den aktuella kategorin (t.ex. 'ryad-bab-1') från URL:en
    this.currentCategory = this.route.snapshot.paramMap.get('category') || '';
    // 🌟 فحص ما إذا كنا في صفحة الأربعين النووية
    this.isNawawi = this.currentCategory === 'hadith-nawawi-40';
    });
  }

  
// 1. Gå tillbaka till huvudmenyn (الأبواب الرئيسية)
  goToChaptersList(): void {
    this.router.navigate(['/hadith/ryad-alsalihin']);
  }

  // 2. Gå till föregående bab (الباب السابق)
  goToPreviousChapter(): void {
    // Om du har ett system med bab-nummer (t.ex. ryad-bab-2 -> ryad-bab-1)
    if (this.currentCategory.startsWith('ryad-bab-')) {
      const babNum = parseInt(this.currentCategory.replace('ryad-bab-', ''), 10);
      if (babNum > 1) {
        this.router.navigate([`/hadith/ryad-bab-${babNum - 1}/menu`]);
      } else {
        // Om vi är på Bab 1 går vi tillbaka till huvudlistan
        this.goToChaptersList();
      }
    } else {
      this.goToChaptersList();
    }
  }
// 3. Gå till nästa bab (الباب التالي)
  goToNextChapter(): void {
    if (this.currentCategory.startsWith('ryad-bab-')) {
      const babNum = parseInt(this.currentCategory.replace('ryad-bab-', ''), 10);
      // Ändra siffra om du vill sätta ett max-antal bab
      this.router.navigate([`/hadith/ryad-bab-${babNum + 1}/menu`]);
    }
  }
  // دالة لاختيار القائمة والعنوان المناسب بناءً على التصنيف
  selectMenuList(category: string) {
    switch (category) {
      case 'ryad-alsalihin':
      case 'nawawi-intro':
        this.titleHeader = 'الامام النووي';
        this.hadithNamesList = this.nawawiIntro;
        break;

      case 'ryad-bab-1':
        this.titleHeader = 'رياض الصالحين - باب الإخلاص';
        this.hadithNamesList = this.ryadBab1List;
        break;

      case 'ryad-bab-2': 
        this.titleHeader = 'رياض الصالحين - باب التوبة';
        this.hadithNamesList = this.ryadBab2List;
        break;

      case 'ryad-bab-3':
        this.titleHeader = 'رياض الصالحين - باب الصبر';
        this.hadithNamesList = this.ryadBab3List;
        break;
        
      case 'ryad-bab-4':
        this.titleHeader = 'رياض الصالحين - باب الصبر';
        this.hadithNamesList = this.ryadBab4List;
        break;


      case 'hadith-nawawi-40':
      default:
        this.titleHeader = 'احاديث الأربعين النووية';
        this.hadithNamesList = this.nawawiList;
        break;
    }
  }
}