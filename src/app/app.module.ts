import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './playground/board/board.component';
import { ControlsComponent } from './playground/controls/controls.component';
import { PathService } from './playground/board/path.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    HeaderComponent,
    BoardComponent,
    ControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PathService],
  bootstrap: [AppComponent]
})
export class AppModule { }
