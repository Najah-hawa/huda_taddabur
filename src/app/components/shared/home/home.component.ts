import { Component , OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { Title, Meta } from '@angular/platform-browser'; //
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // 👈 ضروري لتشتغل routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // 👈 لازم يكون اسمها style**Urls**
})
export class HomeComponent implements OnInit {
  
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätter titeln i webbläsarfliken specifikt för startsidan
    this.titleService.setTitle('هدى وتدبر - الرئيسية');
    
    // Uppdaterar meta-beskrivningen om det behövs
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'تطبيق هدى وتدبر يقدم شرحاً للقرآن الكريم، وعرضاً للأحاديث النبوية وخاصة الأربعين النووية، بالإضافة إلى أحكام الفقه الإسلامي.' 
    });
  }
}