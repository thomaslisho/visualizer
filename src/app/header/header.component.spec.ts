import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { EndorseComponent } from '../endorse/endorse.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PlaygroundComponent } from '../playground/playground.component';

import { HeaderComponent } from './header.component';

const routes: Routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full' },
  { path: 'sorting', component: PlaygroundComponent },
  { path: 'endorse', component: EndorseComponent },
  { path: '**', component: PageNotFoundComponent },
];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule.forRoot(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
