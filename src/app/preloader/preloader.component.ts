import { Component, OnInit } from '@angular/core';
import {PreloaderService, PreloaderServiceListener} from './preloader.service';
import {fadeAnimation} from "../animations";
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('preloaderAnimation', [
      transition('* <=> *', [
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
    ])
  ]
})
export class PreloaderComponent implements OnInit, PreloaderServiceListener {
  public isShown = false;
  constructor(private preloaderService:PreloaderService) { }

  ngOnInit() {
    this.preloaderService.setListener(this);
  }

  onHide() {
    this.isShown = false;
  }

  onShow() {
    this.isShown = true;
  }

}
