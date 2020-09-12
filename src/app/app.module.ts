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
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    HeaderComponent,
    BoardComponent,
    ControlsComponent,
  ],
  imports: [
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
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
