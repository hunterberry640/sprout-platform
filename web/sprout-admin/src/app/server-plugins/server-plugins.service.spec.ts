import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ServerPluginsService } from './server-plugins.service';

describe('ServerPluginsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ServerPluginsService]
    });
  });

  it('should be created', inject([ServerPluginsService], (service: ServerPluginsService) => {
    expect(service).toBeTruthy();
  }));
});
