import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith11Component } from './hadith-11.component';

describe('Hadith11Component', () => {
  let component: Hadith11Component;
  let fixture: ComponentFixture<Hadith11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
