import { TestBed } from '@angular/core/testing';

import { StatusTextService } from './status-text.service';

describe('StatusTextService', () => {
  let service: StatusTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
