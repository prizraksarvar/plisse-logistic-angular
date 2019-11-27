import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCalendarComponent } from './delivery-calendar.component';

describe('DeliveryCalendarComponent', () => {
  let component: DeliveryCalendarComponent;
  let fixture: ComponentFixture<DeliveryCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
