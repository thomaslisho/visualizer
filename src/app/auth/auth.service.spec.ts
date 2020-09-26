import { TestBed } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { EndorseComponent } from '../endorse/endorse.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PlaygroundComponent } from '../playground/playground.component';

import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full' },
  { path: 'sorting', component: PlaygroundComponent },
  { path: 'endorse', component: EndorseComponent },
  { path: '**', component: PageNotFoundComponent },
];

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterModule.forRoot(routes)] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
