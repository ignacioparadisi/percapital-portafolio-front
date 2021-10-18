import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRvFormComponent } from './price-rv-form.component';

describe('PriceRvFormComponent', () => {
  let component: PriceRvFormComponent;
  let fixture: ComponentFixture<PriceRvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRvFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
