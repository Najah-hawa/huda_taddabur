import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hadith12Component } from './hadith-12.component';

describe('Hadith12Component', () => {
  let component: Hadith12Component;
  let fixture: ComponentFixture<Hadith12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hadith12Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hadith12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
