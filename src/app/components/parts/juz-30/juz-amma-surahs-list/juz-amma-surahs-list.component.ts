import { Component, OnInit } from '@angular/core'; // 👈 Importera OnInit
import { RouterModule } from '@angular/router'; 
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera Title och Meta

@Component({
  selector: 'app-juz-amma-surahs-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './juz-amma-surahs-list.component.html',
  styleUrl: './juz-amma-surahs-list.component.css'
})
export class JuzAmmaSurahsListComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätter en tydlig och beskrivande titel för webbläsarfliken
    this.titleService.setTitle('هدى وتدبر - جزء عم (الأجزاء والـسور)');
    
    // Specifik beskrivning för Google så att användare hittar rätt när de söker på Juz Amma
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'فهرس وسور جزء عمَّ (الجزء الثلاثون) في تطبيق هدى وتدبر. تصفح سورة النبأ، النازعات، عبس، التكوير، المطففين وغيرها مع التفسير والتدبر.' 
    });
  }
}