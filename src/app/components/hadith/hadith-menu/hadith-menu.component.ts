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
  ryadBab1List: string[] = [ 
    ' مقدمة باب الاخلاص واحضار النية في جميع الاعمال والاحوال',
     'شرح الآيات',
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
  ryadBab2List: string[] = [
    'مقدمة باب التوبة',
    'شرح الآيات ',
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
  ryadBab3List: string[] = [
    ' مقدمة باب الصبر',
    'شرح الآيات', 
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
  ryadBab4List: string[] = [
    'مقدمة باب الصدق',
    'شرح الآيات', 
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس'
  ];
  ryadBab5List: string[] = [
    ' مقدمة باب المراقبة',
    'شرح الآيات', 
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
    'الحديث الثامن',
    'الحديث التاسع'
  ];
   ryadBab6List: string[] = [
    'مقدمة باب التقوى',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس'
  ];
  ryadBab7List: string[] = [
    'مقدمة باب اليقين والتوكل ',
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
  ];
  ryadBab8List: string[] = [
    'مقدمة باب  الاستقامة ',
    'الحديث الأول',
    'الحديث الثاني'
  ];
  ryadBab9List: string[] = [
    'مقدمة باب التفكر في عظيم مخلوقات الله '
  ];
  ryadBab10List: string[] = [
    'مقدمة باب  المبادرة إلى الخيرات ',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
    'الحديث الثامن',

  ];
  ryadBab127List: string[] = [
   'مقدمة كتاب آداب النوم',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس'
  ];
  ryadBab128List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
  ];
  ryadBab129List: string[] = [
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
  ];
  ryadBab130List: string[] = [
    ' مقدمة باب الرؤيا وما يتعلق بها',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع'
  ];
  ryadBab131List: string[] = [
    'كتاب السلام',
    'مقدمة باب فضل السلام والأمر بإفشائه',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
   
  ];
  ryadBab132List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
   
  ];
  ryadBab133List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
  ];  
  ryadBab134List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
  ];
   ryadBab135List: string[] = [
    'المقدمة ',
    'الحديث الأول',
  ];
   ryadBab136List: string[] = [
    'الحديث الأول',
  ];
  ryadBab137List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
  ];
  ryadBab138List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
  ];
  ryadBab139List: string[] = [
    'الحديث الأول',
  ];
  ryadBab140List: string[] = [
    ' شرح أيات الباب',
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
  ];
  ryadBab141List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
  ];
  ryadBab142List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
  ];
  ryadBab143List: string[] = [
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع',
    'الحديث الثامن',
    'الحديث التاسع',
  ];
  ryadBab144List: string[] = [
    '  كتاب عيادة المريض وتشييع الميت والصلاة عليه وحضور دفنه والمكث عند قبره بعد دفنه ', 
    'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع'
  ];
  ryadBab145List: string[] = [
   'الحديث الأول',
    'الحديث الثاني',
    'الحديث الثالث',
    'الحديث الرابع',
    'الحديث الخامس',
    'الحديث السادس',
    'الحديث السابع', 
    'الحديث الثامن',
    'الحديث التاسع'
  ];
  ryadBab146List: string[] = [
   'الحديث الأول',
  ];
   ryadBab147List: string[] = [
   'الحديث الأول',
    'الحديث الثاني',
  ];
   ryadBab148List: string[] = [
   'الحديث الأول',
  ];
   ryadBab149List: string[] = [
   'الحديث الأول',
    'الحديث الثاني',
     'الحديث الثالث',
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
        this.titleHeader = 'رياض الصالحين - باب الصدق';
        this.hadithNamesList = this.ryadBab4List;
        break;

      case 'ryad-bab-5':
        this.titleHeader = 'رياض الصالحين - باب المراقبة';
        this.hadithNamesList = this.ryadBab5List;
        break;
      case 'ryad-bab-6':
        this.titleHeader = 'رياض الصالحين - باب التقوى';
        this.hadithNamesList = this.ryadBab6List;
        break;
        case 'ryad-bab-7':
        this.titleHeader = 'رياض الصالحين - باب اليقين والتوكل';
        this.hadithNamesList = this.ryadBab7List;
        break;
        case 'ryad-bab-8':
        this.titleHeader = 'رياض الصالحين - باب الاستقامة ';
        this.hadithNamesList = this.ryadBab8List;
        break;
        case 'ryad-bab-9':
        this.titleHeader = 'رياض الصالحين - باب التفكر في عظيم مخلوقات الله ';
        this.hadithNamesList = this.ryadBab9List;
        break;
        case 'ryad-bab-10':
        this.titleHeader = 'رياض الصالحين - باب  المبادرة إلى الخيرات ';
        this.hadithNamesList = this.ryadBab10List;
        break;
        case 'ryad-bab-127':
        this.titleHeader = 'باب مايقوله عند النوم والاضجاع والقعود';
        this.hadithNamesList = this.ryadBab127List;
        break;
        case 'ryad-bab-128':
        this.titleHeader = 'باب جواز الاستلقاء على القفا ووضع إحدى الرجلين على الأخرى إذا لم يخف انكشاف العورة ، وجواز القعود متربعاً ومحتبياً' ;
        this.hadithNamesList = this.ryadBab128List;
        break;
        case 'ryad-bab-129':
        this.titleHeader = 'باب اداب المجالس والجليس' ;
        this.hadithNamesList = this.ryadBab129List;
        break;
        ;
        case 'ryad-bab-130':
        this.titleHeader = ' باب الرؤيا وما يتعلق بها  ' ;
        this.hadithNamesList = this.ryadBab130List;
        break;
        case 'ryad-bab-131':
        this.titleHeader = '  باب فضل السلام والأمر بإفشائه' ;
        this.hadithNamesList = this.ryadBab131List;
        break;
        case 'ryad-bab-132':
        this.titleHeader = 'باب كيفية السلام ' ;
        this.hadithNamesList = this.ryadBab132List;
        break;
        case 'ryad-bab-133':
        this.titleHeader = ' باب آداب السلام' ;
        this.hadithNamesList = this.ryadBab133List;
        break;
        case 'ryad-bab-134':
        this.titleHeader = ' باب استحباب إعادة السلام على من تكرر لقاؤه على قرب بأن دخل ثم خرج ثم دخل في الحال أو حال بينها شجرة ونحوها .' ;
        this.hadithNamesList = this.ryadBab134List;
        break;
        case 'ryad-bab-135':
        this.titleHeader = ' باب استحباب السلام إذا دخل بيته' ;
        this.hadithNamesList = this.ryadBab135List;
        break;
        case 'ryad-bab-136':
        this.titleHeader = ' باب السلام على الصبيان' ;
        this.hadithNamesList = this.ryadBab136List;
        break;
        case 'ryad-bab-137':
        this.titleHeader = 'بابُ سلام الرجل على زوجته والمرأة من محارمه ، وعلى أجنبية وأجتنبيات لا يخاف الفتنة بهنَّ ، وسلامهنَّ بهذا الشرط.' ;
        this.hadithNamesList = this.ryadBab137List;
        break;
        case 'ryad-bab-138':
        this.titleHeader = 'باب تحريم ابتدائنا الكفار بالسلام، وكيفية الرد عليهم واستحباب السلام مع أهل مجلس فيهم مسلمون وكفار';
        this.hadithNamesList = this.ryadBab138List;
        break;
        case 'ryad-bab-139':
        this.titleHeader = 'باب استحباب السلام إذا قام من المجلس وفارق جلساءه أو جليسه';
        this.hadithNamesList = this.ryadBab139List;
        break;
        case 'ryad-bab-140':
        this.titleHeader = 'باب الاستئذان وآدابه';
        this.hadithNamesList = this.ryadBab140List;
        break;
        case 'ryad-bab-141':
        this.titleHeader = 'باب بيان أن السنة إذا قيل للمستأذن من أنت؟ أن يقول فلان فيسمي نفسه بما يعرف به من اسم أو كنية وكراهية قول أنا ونحوها';
        this.hadithNamesList = this.ryadBab141List;
        break;
        case 'ryad-bab-142':
        this.titleHeader =' باب استحباب تشميت العاطس إذا حمد الله تعالى وكراهية تشميته إذا لم يحمد الله تعالى وبيان آداب التشميت والعطاس والتثاوب';
        this.hadithNamesList = this.ryadBab142List;
        break;
        case 'ryad-bab-143':
        this.titleHeader = 'باب استحباب المصافحة عند اللقاء وبشاشة الوجه وَتقبيل يد الرجل الصالح.. وَتقبيل ولده شفقة وَمعانقة القادم من السفر وَكراهية الانحناء';
        this.hadithNamesList = this.ryadBab143List;
        break;
        case 'ryad-bab-144':
        this.titleHeader = ' باب عيادة المريض  ';
        this.hadithNamesList = this.ryadBab144List;
        break;
        case 'ryad-bab-145':
        this.titleHeader = 'باب ما يدعى به للمريض'
        this.hadithNamesList = this.ryadBab145List;
        break; 
        case 'ryad-bab-146':
        this.titleHeader = 'باب استحباب سؤال أهل المريض عن حاله';
        this.hadithNamesList = this.ryadBab146List;
        break;
        case 'ryad-bab-147':
        this.titleHeader = 'باب ما يقوله من أيس من حياته';
        this.hadithNamesList = this.ryadBab147List;
        break;
         case 'ryad-bab-148':
        this.titleHeader = 'باب استحباب وصية أهل المريض ومن يخدمه بالإحسان إليه والصبر على ما يشق من أمره',
        this.hadithNamesList = this.ryadBab148List;
        break;
         case 'ryad-bab-149':
        this.titleHeader = 'باب جواز قول المريض: أنا وجع، أو شديد الوجع، أو موعوك، أو وارأساه، وبيان أنه لا كراهة في ذلك';
        this.hadithNamesList = this.ryadBab149List;
        break;

       
       

   


      case 'hadith-nawawi-40':
      default:
        this.titleHeader = 'احاديث الأربعين النووية';
        this.hadithNamesList = this.nawawiList;
        break;
    }
  }
}