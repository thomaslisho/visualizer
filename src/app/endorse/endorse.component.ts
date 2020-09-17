import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateNewComponent } from './create-new/create-new.component';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { UserComment } from '../shared/Comment.model';

@Component({
  selector: 'app-endorse',
  templateUrl: './endorse.component.html',
  styleUrls: ['./endorse.component.scss'],
})
export class EndorseComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private _bottomSheet: MatBottomSheet,
    private dataStorageService: DataStorageService
  ) {}
  private userProfileSubscription: Subscription;
  private loggedStatusSubscription: Subscription;
  isLoggedIn: boolean;
  loginData: any;
  comments: UserComment[];

  ngOnInit(): void {
    this.dataStorageService.getComments().subscribe(data=>{
      console.log(data);
      this.comments = data;
    });
    this.userProfileSubscription = this.authService.userProfile$.subscribe(
      (data) => {
        this.loginData = data;
        this.loggedStatusSubscription = this.authService.isAuthenticated$.subscribe(
          (data) => (this.isLoggedIn = data)
        );
      }
    );
  }
  ngOnDestroy(): void {
    this.loggedStatusSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
  openBottomSheet(): void {
    if (this.isLoggedIn)
      this._bottomSheet.open(CreateNewComponent, {
        data: this.loginData,
      });
    else this.authService.login('/endorse');
  }
}
