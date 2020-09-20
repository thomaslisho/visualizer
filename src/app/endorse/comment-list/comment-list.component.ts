import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserComment } from 'src/app/shared/Comment.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  comments: UserComment[];
  constructor(private dataStorageService: DataStorageService) {}
  private commentsSubscription: Subscription;
  ngOnInit(): void {
    this.commentsSubscription = this.dataStorageService.comments.subscribe(
      (comments) => (this.comments = comments)
    );
  }
  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }
}
