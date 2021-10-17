import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationSellListComponent } from './operation-sell-list.component';

describe('OperationSellListComponent', () => {
  let component: OperationSellListComponent;
  let fixture: ComponentFixture<OperationSellListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationSellListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationSellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
