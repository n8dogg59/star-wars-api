import { TestBed } from '@angular/core/testing';

import { apiCallService } from './apicall.service';

describe('apiCallService', () => {
  let service: apiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(apiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
