import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateNewComponent } from './create-new/create-new.component';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-endorse',
  templateUrl: './endorse.component.html',
  styleUrls: ['./endorse.component.scss'],
  animations: [
    trigger('loginButtonState', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void=>*', [
        style({ transform: 'translateY(200%)', opacity: 0 }),
        animate(1000),
      ]),
    ]),
    trigger('logOutButtonState', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void=>*', [
        style({ transform: 'translateX(200%)', opacity: 0 }),
        animate(1000),
      ]),
    ]),
  ],
})
export class EndorseComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private dataStorageService: DataStorageService
  ) {}
  private userProfileSubscription: Subscription;
  private loggedStatusSubscription: Subscription;

  isLoggedIn: boolean;
  loginData: any;

  ngOnInit(): void {
    this.userProfileSubscription = this.authService.userProfile$.subscribe(
      (data) => {
        this.loginData = data;
        this.loggedStatusSubscription = this.authService.isAuthenticated$.subscribe(
          (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
        );
      }
    );
  }
  ngOnDestroy(): void {
    this.loggedStatusSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
  openBottomSheet(): void {
    let bottomSheetData = { ...this.loginData };
    if (this.isLoggedIn) {
      this.findUserComment()
        .then((querySnapShot) => {
          bottomSheetData = {
            ...bottomSheetData,
            userExists: !querySnapShot.empty,
          };
          querySnapShot.forEach((doc: any) => {
            bottomSheetData = {
              ...bottomSheetData,
              comment: doc.data().comment,
              title: doc.data().title,
            };
          });
          this.bottomSheet.open(CreateNewComponent, {
            data: bottomSheetData,
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    } else {
      this.authService.login('/endorse');
    }
  }

  findUserComment(): Promise<any> {
    return this.dataStorageService.findUserComment(this.loginData.sub);
  }
}
