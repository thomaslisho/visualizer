import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  endorse() {
    this.router.navigate(['/endorse']);
  }
  openLinkedInLisho() {
    window.open('https://www.linkedin.com/in/lisho-thomas/', '_blank');
  }
}
