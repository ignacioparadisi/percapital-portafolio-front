import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDashboardComponent } from './prediction-dashboard.component';

describe('PredictionDashboardComponent', () => {
  let component: PredictionDashboardComponent;
  let fixture: ComponentFixture<PredictionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
