import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private ngNavigatorShareService: NgNavigatorShareService,
    private snackbar: MatSnackBar
  ) {}
  title = 'Sorting Visualizer';

  ngOnInit(): void {}

  endorse(): void {
    this.router.navigate(['/endorse']);
  }
  openLinkedInLisho(): void {
    window.open('https://www.linkedin.com/in/lisho-thomas/', '_blank');
  }
  share() {
    if (!this.ngNavigatorShareService.canShare()) {
      this.snackbar.open('The functionality is not supported!', 'Close', {
        duration: 5000,
      });
      return;
    }
    this.ngNavigatorShareService
      .share({
        title: 'Sorting Visualizer',
        text:
          'A simple app visualizing sorting algorithms in an interactive environment. Do comment your thoughts and criticisms in the comment section provided!',
        url: 'https://visualizer-7839c.web.app',
      })
      .then((response) => {
        this.snackbar.open('Thank you for sharing !', 'Close', {
          duration: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
