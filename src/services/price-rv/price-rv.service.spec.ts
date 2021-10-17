import { TestBed } from '@angular/core/testing';

import { PriceRvService } from './price-rv.service';

describe('PriceRvService', () => {
  let service: PriceRvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceRvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
