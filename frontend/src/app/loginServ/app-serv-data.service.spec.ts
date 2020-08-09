import { TestBed } from '@angular/core/testing';

import { AppServDataService } from './app-serv-data.service';

describe('AppServDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppServDataService = TestBed.get(AppServDataService);
    expect(service).toBeTruthy();
  });
});
