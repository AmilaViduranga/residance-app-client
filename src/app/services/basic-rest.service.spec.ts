import { TestBed } from '@angular/core/testing';

import { BasicRestService } from './basic-rest.service';

describe('BasicRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicRestService = TestBed.get(BasicRestService);
    expect(service).toBeTruthy();
  });
});
