import {BaseControl} from "./base-control";
import {ControlTypes} from "./control-types.enum";


export class CheckboxControl extends BaseControl<string> {
    controlType = ControlTypes.checkbox;

    constructor(options: {} = {}) {
        super(options);
    }
}