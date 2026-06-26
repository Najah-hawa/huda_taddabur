import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith9Component } from './hadith-9.component';

describe('Hadith9Component', () => {
  let component: Hadith9Component;
  let fixture: ComponentFixture<Hadith9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
