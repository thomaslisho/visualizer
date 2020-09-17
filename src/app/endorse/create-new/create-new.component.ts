import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent implements OnInit {
  commentForm: FormGroup;
  enable: boolean;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateNewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.enable = false;
    this.commentForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
    });

    this.commentForm.statusChanges.subscribe((value) => {
      this.enable = value == 'VALID';
    });
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.dataStorageService
      .createComment({
        id: this.data['sub'],
        name: this.data['name'],
        email: this.data['email'],
        imgSrc: this.data['picture'],
        title: this.commentForm.value['title'],
        comment: this.commentForm.value['comment'],
        dateTime: Date.now()
      })
      .subscribe((data) => console.log(data));
  }

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

  clear() {
    setTimeout(() => this._bottomSheetRef.dismiss(), 100);
  }
}
