import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserComment } from 'src/app/shared/Comment.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: [
    trigger('cardState', [
      state('in', style({ transform: 'translateX(0)', opacity:1 })),
      transition('void=>*', [
        style({ transform: 'translateX(10%)', opacity: 0 }),
        animate(1000),
      ]),
    ]),
    trigger('imageState', [
      state('in', style({ transform: 'translateY(0)', opacity:1 })),
      transition('void=>*', [
        style({ transform: 'translateY(10%)', opacity: 0 }),
        animate(1000),
      ]),
    ]),
  ],
})
export class CommentListComponent implements OnInit, OnDestroy {
  comments: UserComment[];
  constructor(private dataStorageService: DataStorageService) {}
  private commentsSubscription: Subscription;
  ngOnInit(): void {
    this.commentsSubscription = this.dataStorageService.comments.subscribe(
      (comments) => (this.comments = comments),
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }
}
