import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


// Routable animations
export const fadeAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('400ms ease-out', style({ opacity: 1 }))
        ],{ optional: true, delay: '200ms'})
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);
