import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserComment } from 'src/app/shared/Comment.model';

import { DataStorageService } from '../../shared/data-storage.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

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
    private dataStorageService: DataStorageService,
    private _dialog: MatDialog
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
    let userComment: UserComment = {
      id: this.data['sub'],
      name: this.data['name'],
      email: this.data['email'],
      imgSrc: this.data['picture'],
      title: this.commentForm.value['title'],
      comment: this.commentForm.value['comment'],
    };
    if (this.editingForm) {
      this.dataStorageService.updateComment(userComment).then((_) =>
        this._snackbar.open('Your comment has been updated!', 'Close', {
          duration: 5000,
        })
      );
    } else {
      this.dataStorageService
        .createComment({ ...userComment, dateTime: Date.now() })
        .then((_) => {
          this._snackbar.open('Thank you for your feedback!', 'Close', {
            duration: 5000,
          });
        });
    }
  }

  clear() {
    setTimeout(() => this._bottomSheetRef.dismiss(), 100);
  }

  deleteComment() {
    this._bottomSheetRef.dismiss();
    if (this.editingForm) {
      this.openDialog().subscribe((confirmation) => {
        if (confirmation) {
          this.dataStorageService
            .deleteComment(this.data['sub'])
            .then((data) => {
              this._snackbar.open('Your Comment is deleted!', 'Close', {
                duration: 5000,
              });
            });
        } else {
          this._snackbar.open('Thank God, That was a close One!', 'Close', {
            duration: 5000,
          });
        }
      });
    } else {
      console.log("You cannot delete a comment which hasn't yet created");
      return;
    }
  }

  openDialog(): Observable<any> {
    return this._dialog
      .open(DeleteConfirmationComponent, {
        data: { name: this.data['name'] },
        autoFocus: true,
      })
      .afterClosed();
  }
}
