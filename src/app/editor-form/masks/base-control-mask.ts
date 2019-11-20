

export abstract class BaseControlMask<T> {
    abstract processValueChange(value:T, backspace:boolean):T;
}