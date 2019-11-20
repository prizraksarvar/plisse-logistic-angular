import {BaseControl} from "./base-control";
import {ControlTypes} from "./control-types.enum";


export class DropdownControl extends BaseControl<string> {
    controlType = ControlTypes.dropdown;
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}