import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMonthComponent } from './delivery-month.component';

describe('DeliveryMonthComponent', () => {
  let component: DeliveryMonthComponent;
  let fixture: ComponentFixture<DeliveryMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
