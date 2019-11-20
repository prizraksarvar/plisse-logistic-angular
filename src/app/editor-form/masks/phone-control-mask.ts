import {BaseControlMask} from "./base-control-mask";


export class PhoneControlMask extends BaseControlMask<string> {
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
            if (newVal[0]!='7') {
                if (newVal[0]=='8')
                    newVal = '7' + newVal.slice(1);
                else {
                    newVal = '7' + newVal;
                }
            }
            let regExp = /^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})(\d*)/;
            if (newVal.length==1) {
                newVal = newVal.replace(regExp, '+7');
            } else if (newVal.length<5) {
                newVal = newVal.replace(regExp, '+7 ($1');
            } else if (newVal.length<8) {
                newVal = newVal.replace(regExp, '+7 ($1) $2');
            } else if (newVal.length<10) {
                newVal = newVal.replace(regExp, '+7 ($1) $2 $3');
            } else {
                newVal = newVal.replace(regExp, '+7 ($1) $2 $3 $4');
            }

        }
        return newVal;
    }
}