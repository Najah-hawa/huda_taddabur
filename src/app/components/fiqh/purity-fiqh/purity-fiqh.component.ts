import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-purity-fiqh',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule // 2. Lägg till RouterModule i din imports-array här
  ],
  templateUrl: './purity-fiqh.component.html',
  styleUrls: ['./purity-fiqh.component.css']
})
export class PurityFiqhComponent implements OnInit {
  mainTitle = 'فقه الطهارة ';
  
  // التبويب الافتراضي عند فتح الصفحة
  activeTab: string = 'definition'; 

  // خريطة تحتوي على العناوين والأوصاف المطابقة تماماً لمحتوى الـ HTML الخاص بك
  private seoData: Record<string, { title: string; desc: string }> = {
    'definition': {
      title: 'مفهوم الطهارة: رفع حدث أو إزالة نجس',
      desc: 'شرح مفهوم الطهارة في الفقه الإسلامي، والتعرف على الفرق بين رفع الحدث الأصغر والأكبر وإزالة النجاسات.'
    },
    'conditions': {
      title: 'شروط الطهارة وأهميتها في العبادات',
      desc: 'بيان أهمية الطهارة كشرط أساسي لصحة الصلاة، واستعمال الآنية وظروف الطبخ، ونظافة الأطعمة والأشربة والألبسة.'
    },
    'sections': {
      title: 'أقسام الطهارة: الأصلية والعارضة',
      desc: 'تعرف على أقسام الطهارة في الشريعة الإسلامية، بما في ذلك الطهارة الأصلية في الأشياء والطهارة العارضة بسبب الخبث.'
    },
    'water-intro': {
      title: 'أحكام المياه ومقدمة عن التطهير',
      desc: 'مقدمة شاملة عن أحكام المياه باعتبارها وسيلة التطهير الوحيدة الأصلية في باب الطهارة، وحكم نيابة التراب عنها.'
    },
    'water-pure-purifier': {
      title: 'الماء الطاهر المطهر (الطهور) وأحكامه',
      desc: 'تعريف الماء الطهور الذي يرفع الحدث ويزيل النجس، وحكم كراهة استعمال الماء شديد البرودة أو شديد السخونة.'
    },
    'water-pure-not-purifier': {
      title: 'الماء الطاهر غير المطهر وأنواعه',
      desc: 'حكم الماء الطاهر في نفسه وغير المطهر لغيره، مثل الماء القليل المستعمل وغسالة النجاسة والماء المخلوط بطاهر.'
    },
    'water-impure': {
      title: 'أحكام الماء المتنجس وحجم الماء قليل وكثير',
      desc: 'أحكام الماء المتنجس وتأثير وقوع النجاسة فيه بحسب حجمه، والفرق بين الماء القليل (أقل من 195 لتر) والماء الكثير.'
    },
    'impure-heavy': {
      title: 'النجاسة المغلظة وكيفية الطهارة منها',
      desc: 'أحكام النجاسة المغلظة (الكلب والخنزير وما تولد منهما) وكيفية غسل الموضع المتنجس سبع مرات إحداهن بالتراب.'
    },
    'impure-light': {
      title: 'النجاسة المخففة وأحكام بول الصبي',
      desc: 'أحكام النجاسة المخففة الخاصة ببول الصبي دون السنتين الذي يعتمد على اللبن فقط، وكيفية تطهيرها بالنضح والرّش.'
    },
    'impure-medium': {
      title: 'النجاسة المتوسطة العينية والحكمية',
      desc: 'قائمة أعيان النجاسة المتوسطة كالدم والقيء والميتة والمسكر المائع، وطريقة تطهير النجاسات العينية والحكمية.'
    },
    'haid': {
      title: 'فقه دماء النساء: أحكام الحيض ومدته الشرعية',
      desc: 'تعريف دم الحيض، أهمية البحث فيه دينياً وطبياً، السن والمدة الشرعية لأقل الحيض وأكثره، ومدة الطهر ومسائل تطبيقية.'
    },
    'nifas': {
      title: 'فقه دماء النساء: أحكام النفاس ومدته الشرعية',
      desc: 'تعريف دم النفاس الخارج عقب الولادة أو الإسقاط، وبيان مدته الشرعية في الفقه الإسلامي بين أقله وأكثره.'
    },
    'prohibited': {
      title: 'ما يحرم بالحيض والنفاس من العبادات والمعاملات',
      desc: 'الأمور السبعة التي تحرم على الحائض والنفساء تيسيراً وتخفيفاً، ومنها الصلاة والصوم وقراءة القرآن ومس المصحف واللبث في المسجد.'
    },
    'istihada': {
      title: 'فقه دماء النساء: أحكام الاستحاضة وعيوب الدم',
      desc: 'تعريف دم الاستحاضة وأحكامه الشرعية التفصيلية للمستحاضة من كيفية الوضوء لكل صلاة واشتراط الموالاة.'
    },
    'sunan-fitra': {
      title: 'المستحبات: عشر من الفطرة في السنة النبوية',
      desc: 'شرح حديث عائشة رضي الله عنها في سنن الفطرة العشرة ومنها قص الشارب، السواك، قص الأظافر، والمضمضة.'
    },
    'siwak': {
      title: 'أحكام السواك وحكمه الشرعي في حالاته المختلفة',
      desc: 'تفصيل أحكام السواك؛ متى يكون سنة مؤكدة، ومتى يكون مستحباً، ومتى يكره استعماله للصائم بعد الزوال.'
    },
    'idihan': {
      title: 'المستحبات: أحكام الادهان غباً وكيفيته',
      desc: 'بيان سنة الادهان غباً يوماً بعد يوم باستخدام الزيت أو الدهن الذي يلين البشرة ويحفظ نقاوتها.'
    },
    'ikfihal': {
      title: 'المستحبات: أحكام الاكتحال وتراً فوائده الطبية',
      desc: 'أحكام الاكتحال وتراً بالكحل العربي (الإثمد) كل ثلاثة أيام كعناية طبية مرطبة للعين.'
    },
    'nails': {
      title: 'المستحبات: آداب تقليم الأظافر وسنتها',
      desc: 'الترتيب الشرعي النبوي المستحب لتقليم أظافر اليدين والرجلين يوم الجمعة قبل الخروج إلى الصلاة.'
    },
    'combing': {
      title: 'المستحبات: ترجيل الشعر ودهنه وإكرامه',
      desc: 'أحكام النظافة الشخصية وترجيل الشعر امتثالاً للحديث النبوي الشريف: من كان له شعر فليكرمه.'
    },
    'hair-removal': {
      title: 'المستحبات: إزالة شعر الإبط وحلق العانة',
      desc: 'أحكام سنن الفطرة في إزالة شعر الإبط وحلق العانة كلما دعت الحاجة، والتنبيه الشرعي بعدم تركه أكثر من أربعين يوماً.'
    },
    'istinja-rules': {
      title: 'الآداب اليومية: الاستنجاء وآداب قضاء الحاجة',
      desc: 'تعريف الاستنجاء وإزالة النجاسة عن المخرجين، مع استعراض قائمة الآداب الثمانية الشرعية عند دخول الخلاء.'
    }
  };

  // 2. Lägg till route och router i din constructor här
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 3. Lyssna på adressfältet. Om det står fiqh/purity?tab=haid så öppnas den fliken direkt
    this.route.queryParams.subscribe(params => {
      const tabFromUrl = params['tab'];
      
      if (tabFromUrl && this.seoData[tabFromUrl]) {
        this.activeTab = tabFromUrl;
      } else {
        this.activeTab = 'definition'; // Default om parametern saknas eller är felaktig
      }
      
      this.updateSEO(this.activeTab);
    });
  }

  // 4. Uppdatera setTab så den istället byter värdet i adressfältet (?tab=...)
  setTab(tabName: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabName },
      queryParamsHandling: 'merge' 
    });
  }

  private updateSEO(tabName: string) {
    const currentSEO = this.seoData[tabName];
    if (currentSEO) {
      this.titleService.setTitle(`${currentSEO.title} - ${this.mainTitle}`);
      this.metaService.updateTag({ name: 'description', content: currentSEO.desc });
      this.metaService.updateTag({ name: 'keywords', content: 'فقه الطهارة, أحكام المياه, النجاسات, فقه النساء, الحيض والنفاس, السواك, الاستنجاء, الفقه الميسر' });
      this.metaService.updateTag({ property: 'og:title', content: currentSEO.title });
      this.metaService.updateTag({ property: 'og:description', content: currentSEO.desc });
    }
  }
}