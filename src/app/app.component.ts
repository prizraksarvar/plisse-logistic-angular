import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "./animations";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      fadeAnimation
    ]),
  ]
})
export class AppComponent implements OnDestroy {
  title = 'plisse-logistic';
  mobileQuery: MediaQueryList;
  menuOpen = true;
  isMobile = false;

  private _mobileQueryListener: () => void;

  constructor(breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (breakpointObserver.isMatched([Breakpoints.XSmall,Breakpoints.Small])) {
          this.menuOpen = false;
          this.isMobile = true;
        } else {
          this.menuOpen = true;
          this.isMobile = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onAnimationEvent ( event: AnimationEvent ) {

  }
}
