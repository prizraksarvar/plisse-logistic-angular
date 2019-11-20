import {BaseControlMask} from "./base-control-mask";


export class TimeControlMask extends BaseControlMask<string> {
    processValueChange(value: string, backspace: boolean): string {
        var newVal = value.replace(/\D/g, '');

        if (backspace && /\D/g.test(value[value.length-1])) {
            newVal = newVal.substr(0, newVal.length-1);
        }

        if (newVal.length == 0) {
            newVal = '';
        }
        // don't show braces for empty groups at the end
        else {
            let regExp = /^(\d{0,2})(\d{0,2})(.*)/;
            if (newVal.length<3) {
                newVal = newVal.replace(regExp, '$1');
            } else {
                newVal = newVal.replace(regExp, '$1:$2');
            }

        }
        return newVal;
    }
}