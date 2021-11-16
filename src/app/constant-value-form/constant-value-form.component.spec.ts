import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantValueFormComponent } from './constant-value-form.component';

describe('ConstantValueFormComponent', () => {
  let component: ConstantValueFormComponent;
  let fixture: ComponentFixture<ConstantValueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantValueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
