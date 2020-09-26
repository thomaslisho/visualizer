import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  QuerySnapshot,
} from '@angular/fire/firestore';

import { UserComment } from './Comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  commentCollection: AngularFirestoreCollection<UserComment>;
  comments: Observable<UserComment[]>;

  constructor(private angFireStr: AngularFirestore) {
    this.commentCollection = this.angFireStr.collection<UserComment>(
      'comments',
      (ref) => ref.orderBy('dateTime', 'desc')
    );

    this.comments = this.commentCollection
      .snapshotChanges()
      .pipe<UserComment[]>(
        map((responseData): UserComment[] => {
          return responseData.map(
            (doc): UserComment => {
              return {
                key: doc.payload.doc.id,
                id: doc.payload.doc.data().id,
                comment: doc.payload.doc.data().comment,
                name: doc.payload.doc.data().name,
                imgSrc: doc.payload.doc.data().imgSrc,
                title: doc.payload.doc.data().title,
                dateTime: doc.payload.doc.data().dateTime,
              };
            }
          );
        })
      );
  }

  createComment(commentData: UserComment): Promise<any> {
    return this.angFireStr.collection('comments').add(commentData);
  }

  findUserComment(key: string): Promise<QuerySnapshot<DocumentData>> {
    return this.angFireStr
      .collection('comments')
      .ref.where('id', '==', key)
      .get();
  }

  async deleteComment(id: string): Promise<void> {
    let queryId = '';
    await this.findUserComment(id).then((data) =>
      data.docs.forEach((doc) => (queryId = doc.ref.id))
    );
    return this.angFireStr
      .collection('comments')
      .doc<UserComment>(queryId)
      .delete();
  }
  async updateComment(commentData: UserComment): Promise<void> {
    let queryId = '';
    await this.findUserComment(commentData.id).then((data) =>
      data.docs.forEach((doc) => (queryId = doc.ref.id))
    );
    return this.angFireStr
      .collection('comments')
      .doc<UserComment>(queryId)
      .update(commentData);
  }
}
