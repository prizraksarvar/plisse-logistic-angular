import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDeliveriesComponent } from './fixed-deliveries.component';

describe('FixedDeliveriesComponent', () => {
  let component: FixedDeliveriesComponent;
  let fixture: ComponentFixture<FixedDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
