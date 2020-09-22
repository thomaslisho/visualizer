import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlayService } from './play.service';
import { PlaygroundComponent } from './playground.component';
import { PathService } from './board/path.service';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';

import { NgxGaugeModule } from 'ngx-gauge';
import { LayoutModule } from '@angular/cdk/layout';

import { AppMaterialModule } from "../shared/app-material.module";

@NgModule({
  declarations: [PlaygroundComponent, BoardComponent, ControlsComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    NgxGaugeModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [PlayService, PathService],
})
export class PlaygroundModule {}