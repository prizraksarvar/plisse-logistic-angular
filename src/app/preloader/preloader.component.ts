import { Component, OnInit } from '@angular/core';
import {PreloaderService, PreloaderServiceListener} from './preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit, PreloaderServiceListener {
  public shown = false;
  constructor(private preloaderService:PreloaderService) { }

  ngOnInit() {
    this.preloaderService.setListener(this);
  }

  onHide() {
    this.shown = false;
  }

  onShow() {
    this.shown = true;
  }

}
