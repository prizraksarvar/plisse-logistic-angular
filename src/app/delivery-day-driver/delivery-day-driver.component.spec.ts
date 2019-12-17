import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDayDriverComponent } from './delivery-day-driver.component';

describe('DeliveryDayDriverComponent', () => {
  let component: DeliveryDayDriverComponent;
  let fixture: ComponentFixture<DeliveryDayDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDayDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDayDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
