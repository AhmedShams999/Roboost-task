/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalSwitcherService } from './localSwitcher.service';

describe('Service: LocalSwitcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalSwitcherService]
    });
  });

  it('should ...', inject([LocalSwitcherService], (service: LocalSwitcherService) => {
    expect(service).toBeTruthy();
  }));
});
