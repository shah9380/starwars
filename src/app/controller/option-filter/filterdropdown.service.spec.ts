import { TestBed } from '@angular/core/testing';

import { FilterdropdownService } from './filterdropdown.service';

describe('FilterdropdownService', () => {
  let service: FilterdropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterdropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
