import { TestBed } from '@angular/core/testing';

import { Product88Service } from './product88.service';

describe('Product88Service', () => {
  let service: Product88Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product88Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
