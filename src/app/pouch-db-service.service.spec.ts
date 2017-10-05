import { TestBed, inject } from '@angular/core/testing';

import { PouchDbServiceService } from './pouch-db-service.service';

describe('PouchDbServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDbServiceService]
    });
  });

  it('should be created', inject([PouchDbServiceService], (service: PouchDbServiceService) => {
    expect(service).toBeTruthy();
  }));
});
