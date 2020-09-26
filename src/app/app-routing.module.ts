import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndorseComponent } from './endorse/endorse.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full' },
  { path: 'sorting', component: PlaygroundComponent },
  { path: 'endorse', component: EndorseComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
