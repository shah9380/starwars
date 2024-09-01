import { TestBed } from '@angular/core/testing';

import { FilterBlockService } from './filter-block.service';

describe('FilterBlockService', () => {
  let service: FilterBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
