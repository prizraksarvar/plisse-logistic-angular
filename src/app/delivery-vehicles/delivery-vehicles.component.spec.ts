import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehiclesComponent } from './delivery-vehicles.component';

describe('DeliveryVehiclesComponent', () => {
  let component: DeliveryVehiclesComponent;
  let fixture: ComponentFixture<DeliveryVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
