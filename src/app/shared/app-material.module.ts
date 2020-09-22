import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

const material = [
  MatCardModule,
  MatSliderModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  MatListModule,
  LayoutModule,
  MatDialogModule,
  MatInputModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [...material],
  exports: [...material],
  providers: [],
})
export class AppMaterialModule {}
