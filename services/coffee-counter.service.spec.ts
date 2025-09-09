import { TestBed } from '@angular/core/testing';

import { CoffeeCounterService } from './coffee-counter.service';

describe('CoffeeCounterService', () => {
  let service: CoffeeCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
