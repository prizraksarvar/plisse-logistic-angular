import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private listener: PreloaderServiceListener;
  private waitIds:number[]=[];
  private currentId = 1;
  constructor() {}

  public setListener(listener: PreloaderServiceListener) {
    this.listener=listener;
    this.show();
    this.hide();
  }

  public wrapPreloader<T>(v:Promise<T>):Promise<T> {
    let waitId = this.getWaitId();
    return v.finally(()=>{
      this.removeWait(waitId);
    });
  }

  public getWaitId() {
    if (this.waitIds.length==0) {
      this.show();
    }
    let id = ++this.currentId;
    this.waitIds.push(id);
    return id;
  }

  public removeWait(waitId:number) {
    this.waitIds.splice(this.waitIds.indexOf(waitId),1);
    if (this.waitIds.length==0) {
      this.hide();
    }
  }

  private show() {
    if (this.listener==null) {
      return;
    }
    this.listener.onShow();
  }

  private hide() {
    if (this.listener==null) {
      return;
    }
    this.listener.onHide();
  }
}

export interface PreloaderServiceListener {
  onShow();
  onHide();
}
