import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDayManagerComponent } from './delivery-day-manager.component';

describe('DeliveryDayManagerComponent', () => {
  let component: DeliveryDayManagerComponent;
  let fixture: ComponentFixture<DeliveryDayManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDayManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDayManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
