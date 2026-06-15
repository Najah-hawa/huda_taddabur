import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiqhMenuComponent } from './fiqh-menu.component';

describe('FiqhMenuComponent', () => {
  let component: FiqhMenuComponent;
  let fixture: ComponentFixture<FiqhMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiqhMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiqhMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
