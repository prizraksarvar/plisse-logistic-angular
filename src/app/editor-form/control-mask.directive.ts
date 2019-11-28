import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from "@angular/forms";
import {BaseControlMask} from "./masks/base-control-mask";

@Directive({
  selector: '[appControlMask]'
})
export class ControlMaskDirective {

  @Input('appControlMask') controlMask: BaseControlMask<any>;

  constructor(public ngControl: NgControl) {
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    if (!(this.controlMask instanceof BaseControlMask)) {
      return;
    }
    this.ngControl.valueAccessor.writeValue(this.controlMask.processValueChange(event, backspace));
  }
}
