import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBuyListComponent } from './operation-buy-list.component';

describe('OperationBuyListComponent', () => {
  let component: OperationBuyListComponent;
  let fixture: ComponentFixture<OperationBuyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationBuyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
