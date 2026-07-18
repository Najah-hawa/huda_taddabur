import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith24Component } from './hadith-24.component';

describe('Hadith24Component', () => {
  let component: Hadith24Component;
  let fixture: ComponentFixture<Hadith24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith24Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
