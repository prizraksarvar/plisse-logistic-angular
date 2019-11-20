import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {BaseControl} from './base-control';
import {FormControlService} from '../form-control.service';
import {ControlTypes} from './control-types.enum';

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements OnInit {

  @Input()
  public controls: BaseControl<any>[];
  @Input()
  public element: object;
  @Input()
  public onSave: (element:object)=>void;
  @Input()
  public onCancel: ()=>void;

  public form: FormGroup = new FormGroup({});

  constructor(
    //private _activateRoute: ActivatedRoute,
    protected formControlSerivce: FormControlService,
    protected _router: Router
  ) { }

  ngOnInit() {
    this.controls.forEach((control)=>{
      control.value = this.element[control.key];
    });
  }

  protected initForm() {
    this.form = this.formControlSerivce.toFormGroup(this.controls);
  }

  isValid(control: BaseControl<any>) {
      return this.form.controls[control.key].valid;
  }

  showError(control: BaseControl<any>) {
    const formField = this.form.controls[control.key];
    return formField.invalid && (formField.dirty || formField.touched);
  }

  error(control: BaseControl<any>) {
    var error='';

    for (let key in this.form.controls[control.key].errors) {
        if (control.errors[key])
            return control.errors[key];
    }
    return "";
  }

  isTextField(control: BaseControl<any>) {
    return control.controlType==ControlTypes.textbox
        || control.controlType==ControlTypes.dropdown
        || control.controlType==ControlTypes.datepicker;
  }

  isCheckField(control: BaseControl<any>) {
    return control.controlType==ControlTypes.checkbox
        || control.controlType==ControlTypes.radio;
  }
}