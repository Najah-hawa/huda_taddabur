import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surah83Component } from './surah-83.component';

describe('Surah83Component', () => {
  let component: Surah83Component;
  let fixture: ComponentFixture<Surah83Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surah83Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Surah83Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
