import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayService } from './play.service';
import { PlaygroundComponent } from './playground.component';
import { PathService } from './board/path.service';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGaugeModule } from 'ngx-gauge';

import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [PlaygroundComponent, BoardComponent, ControlsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatSliderModule,
    NgxGaugeModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [PlayService, PathService],
})
export class PlaygroundModule {}
