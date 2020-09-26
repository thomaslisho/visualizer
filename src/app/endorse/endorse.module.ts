import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndorseComponent } from './endorse.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { DeleteConfirmationComponent } from './create-new/delete-confirmation/delete-confirmation.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppMaterialModule } from '../shared/app-material.module';

@NgModule({
  declarations: [
    EndorseComponent,
    CommentListComponent,
    CreateNewComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    ScrollingModule,
    CommonModule,
  ],
  providers: [],
})
export class EndorseModule {}
