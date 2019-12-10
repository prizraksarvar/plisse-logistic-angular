import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDayLogisticComponent } from './delivery-day-logistic.component';

describe('DeliveryDayLogisticComponent', () => {
  let component: DeliveryDayLogisticComponent;
  let fixture: ComponentFixture<DeliveryDayLogisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDayLogisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDayLogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
