


export class TableAction {
  icon: string;
  callback: (id:number)=>boolean;
  avaibleCallback: (element:any)=>boolean;

  constructor(icon: string, callback: (id:number)=>boolean, avaibleCallback: (element:any)=>boolean) {
    this.icon = icon;
    this.callback = callback;
    this.avaibleCallback = avaibleCallback;
  }
}
