import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRvDialogComponent } from './price-rv-dialog.component';

describe('PriceRvDialogComponent', () => {
  let component: PriceRvDialogComponent;
  let fixture: ComponentFixture<PriceRvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRvDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
