import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewComponent } from './endorse/create-new/create-new.component';
import { EndorseComponent } from './endorse/endorse.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full' },
  { path: 'sorting', component: PlaygroundComponent },
  {
    path: 'endorse',
    children: [
      { path: '', component: EndorseComponent, pathMatch:'full' },
      { path: 'create-new', component: CreateNewComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
