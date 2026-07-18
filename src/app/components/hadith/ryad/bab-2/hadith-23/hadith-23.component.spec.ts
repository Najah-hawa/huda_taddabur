import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith23Component } from './hadith-23.component';

describe('Hadith23Component', () => {
  let component: Hadith23Component;
  let fixture: ComponentFixture<Hadith23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith23Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
