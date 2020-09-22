import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './playground/board/board.component';
import { ControlsComponent } from './playground/controls/controls.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EndorseComponent } from './endorse/endorse.component';
import { CreateNewComponent } from './endorse/create-new/create-new.component';

import { PlayService } from './playground/play.service';
import { PathService } from './playground/board/path.service';

import { MatSliderModule } from '@angular/material/slider';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxGaugeModule } from 'ngx-gauge';
import { CommentListComponent } from './endorse/comment-list/comment-list.component';
import { DeleteConfirmationComponent } from './endorse/create-new//delete-confirmation/delete-confirmation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';

const material = [
  MatDialogModule,
  MatInputModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatIconModule,
  MatToolbarModule,
  MatSliderModule,
  MatRippleModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    HeaderComponent,
    BoardComponent,
    ControlsComponent,
    PageNotFoundComponent,
    EndorseComponent,
    CreateNewComponent,
    CommentListComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    ScrollingModule,
    material,
    NgxGaugeModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [PlayService, PathService],
  bootstrap: [AppComponent],
})
export class AppModule {}
