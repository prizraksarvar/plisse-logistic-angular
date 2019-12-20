import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "./animations";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "./auth/auth.service";
import {User} from "./entities/user";

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'plisse-logistic';
  mobileQuery: MediaQueryList;
  menuOpen = true;
  isMobile = false;
  user: User = null;

  private _mobileQueryListener: () => void;

  constructor(
    public authService: AuthService,
    breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {

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

  ngOnInit(): void {
    this.authService.user.subscribe(value => {
      this.user = value;
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
