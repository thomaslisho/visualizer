import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  quote: string;
  author: string;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://api.quotable.io/random')
      .subscribe((data) => {
        this.quote = data['content'];
        this.author = data['author'];
      });
  }
}
