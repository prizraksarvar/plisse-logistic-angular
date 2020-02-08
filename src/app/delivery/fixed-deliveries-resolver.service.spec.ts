import { TestBed } from '@angular/core/testing';

import { FixedDeliveriesResolverService } from './fixed-deliveries-resolver.service';

describe('FixedDeliveriesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixedDeliveriesResolverService = TestBed.get(FixedDeliveriesResolverService);
    expect(service).toBeTruthy();
  });
});
