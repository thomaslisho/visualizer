import { TestBed } from '@angular/core/testing';
import { PlayService } from '../play.service';

import { PathService } from './path.service';

describe('PathService', () => {
  let service: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[PlayService]
    });
    service = TestBed.inject(PathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
