import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [BrowserAnimationsModule, CommonModule, ...material, ReactiveFormsModule],
})
export class AppMaterialModule {}
