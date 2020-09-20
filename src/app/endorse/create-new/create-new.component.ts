import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent implements OnInit {
  commentForm: FormGroup;
  formEnable: boolean;
  editingForm: boolean = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateNewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _snackbar: MatSnackBar,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    if (this.data['userExists']) {
      this.editingForm = this.data['userExists'];
      this.formEnable = true;
    }
    this.commentForm = new FormGroup({
      title: new FormControl(
        this.data['userExists'] ? this.data['title'] : null,
        Validators.required
      ),
      comment: new FormControl(
        this.data['userExists'] ? this.data['comment'] : null,
        Validators.required
      ),
    });

    this.commentForm.statusChanges.subscribe((value) => {
      this.formEnable = value == 'VALID';
    });
  }

  onSubmit() {
    this._bottomSheetRef.dismiss();
    this.dataStorageService
      .createComment({
        id: this.data['sub'],
        name: this.data['name'],
        email: this.data['email'],
        imgSrc: this.data['picture'],
        title: this.commentForm.value['title'],
        comment: this.commentForm.value['comment'],
        dateTime: Date.now(),
      })
      .then((_) => {
        console.log(_);
        this._snackbar.open('Thank you for your feedback!', 'Close', {
          duration: 5000,
        });
      });
  }

  clear() {
    setTimeout(() => this._bottomSheetRef.dismiss(), 100);
  }

  deleteComment() {
    if (this.editingForm) {
      this.dataStorageService.deleteComment(this.data['sub']).then((data) => {
        this._snackbar.open('Your Comment is deleted Successfully', 'Close', {
          duration: 5000,
        });
      });
    } else {
      console.log("You cannot delete a comment which hasn't yet created");
      return;
    }
  }
}
