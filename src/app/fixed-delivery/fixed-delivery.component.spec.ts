import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDeliveryComponent } from './fixed-delivery.component';

describe('FixedDeliveryComponent', () => {
  let component: FixedDeliveryComponent;
  let fixture: ComponentFixture<FixedDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
