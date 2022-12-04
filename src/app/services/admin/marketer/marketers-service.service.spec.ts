import { TestBed } from '@angular/core/testing';

import { MarketersServiceService } from './marketers-service.service';

describe('MarketersServiceService', () => {
  let service: MarketersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
