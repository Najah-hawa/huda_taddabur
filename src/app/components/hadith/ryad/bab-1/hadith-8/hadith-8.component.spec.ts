import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith8Component } from './hadith-8.component';

describe('Hadith8Component', () => {
  let component: Hadith8Component;
  let fixture: ComponentFixture<Hadith8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
