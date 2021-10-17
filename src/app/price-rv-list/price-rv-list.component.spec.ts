import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRvListComponent } from './price-rv-list.component';

describe('PriceRvListComponent', () => {
  let component: PriceRvListComponent;
  let fixture: ComponentFixture<PriceRvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRvListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
