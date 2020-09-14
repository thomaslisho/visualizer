import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './playground/board/board.component';
import { ControlsComponent } from './playground/controls/controls.component';

import { PlayService } from "./playground/play.service";
import { PathService } from './playground/board/path.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from "@angular/material/slider";
import { MatRippleModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";

import { NgxGaugeModule } from "ngx-gauge";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EndorseComponent } from './endorse/endorse.component';
import { CreateNewComponent } from './endorse/create-new/create-new.component';

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
  ],
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    NgxGaugeModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatSliderModule,
    MatRippleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [PlayService,PathService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
