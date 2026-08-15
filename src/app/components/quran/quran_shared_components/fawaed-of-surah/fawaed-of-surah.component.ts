import { Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
@Component({
  selector: 'app-fawaed-of-surah',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fawaed-of-surah.component.html',
  styleUrl: './fawaed-of-surah.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FawaedOfSurahComponent {
  @Input() SurahFaidah: string = '';
  @Input() FaidaText: string = '';
  safeFaidaText: SafeHtml = ''; // Skapa en variabel för säker HTML

  constructor(private sanitizer: DomSanitizer) {} // Injicera DomSanitizer

  ngOnInit() {
    // Markera texten som säker så att Angular inte tvättar bort taggarna
    this.safeFaidaText = this.sanitizer.bypassSecurityTrustHtml(this.FaidaText);
  }
}


