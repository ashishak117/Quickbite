import { TestBed } from '@angular/core/testing';

import { Restaurant } from './restaurant';

describe('Restaurant', () => {
  let service: Restaurant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Restaurant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
