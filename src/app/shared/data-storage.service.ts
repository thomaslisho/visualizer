import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UserComment } from './Comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private httpClient: HttpClient) {}

  createComment(
    commentData: UserComment
  ) {
    return this.httpClient.post<UserComment>(
      'https://visualizer-7839c.firebaseio.com/comments.json',
      commentData
    );
  }

  getComments() {
    return this.httpClient
      .get<UserComment[]>(
        'https://visualizer-7839c.firebaseio.com/comments.json'
      )
      .pipe(
        map((responseData) => {
          const postArray: UserComment[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({
                id: responseData[key].id,
                name: responseData[key].name,
                imgSrc: responseData[key].imgSrc,
                comment: responseData[key].comment,
                title: responseData[key].title,
                key: key,
                dateTime: responseData[key].dateTime,
              });
            }
          }
          return postArray;
        })
      );
  }
}
