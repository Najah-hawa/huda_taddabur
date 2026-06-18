import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // 👈 Importera dessa

@Component({
  selector: 'app-quran-parts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quran-parts.component.html',
  styleUrl: './quran-parts.component.css'
})
export class QuranPartsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Sätter en unik och tydlig titel för denna undersida
    this.titleService.setTitle('هدى وتدبر - القرآن الكريم');
    
    // Uppdaterar meta-beskrivningen specifikt för korandelen
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'قائمة أجزاء القرآن الكريم وسوره في تطبيق هدى وتدبر. ابدأ بقراءة وتدبر سورة الفاتحة وجزء عمَّ.' 
    });
  }
}