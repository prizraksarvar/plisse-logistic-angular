import {BaseControl} from './base-control';
import {ControlTypes} from './control-types.enum';
import {BaseControlMask} from './masks/base-control-mask';


export class TextboxControl extends BaseControl<string> {
    controlType = ControlTypes.textbox;
    type: string;
    public mask?: BaseControlMask<any>;
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.mask = options['mask'] || null;
    }
}
