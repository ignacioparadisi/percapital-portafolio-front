import { TestBed } from '@angular/core/testing';

import { StockTitleService } from './stock-title.service';

describe('StockTitleService', () => {
  let service: StockTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
