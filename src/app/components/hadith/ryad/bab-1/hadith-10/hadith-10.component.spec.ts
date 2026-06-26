import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith10Component } from './hadith-10.component';

describe('Hadith10Component', () => {
  let component: Hadith10Component;
  let fixture: ComponentFixture<Hadith10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
