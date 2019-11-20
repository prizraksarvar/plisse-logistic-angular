import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BaseControl} from './editor-form/base-control';

@Injectable()
export class FormControlService {
    constructor() { }

    toFormGroup(controls: BaseControl<any>[] ) {
        const group: any = {};

        controls.forEach(control => {
            group[control.key] = this.toFormControl(control);
        });
        return new FormGroup(group);
    }

    toFormControl(control: BaseControl<any>) {
        if (control.required && control.validators.indexOf(Validators.required) < 0) {
            control.validators.push(Validators.required);
        }
        return new FormControl(control.value || '', control.validators);
    }
}
