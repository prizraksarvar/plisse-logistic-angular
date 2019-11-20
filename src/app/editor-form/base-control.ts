
export class BaseControl<T> {
    public value: T;
    public key: string;
    public label: string;
    public required: boolean;
    public order: number;
    public controlType: string;
    public errors: {};
    public validators: any[];
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
        errors?: {}
        validators?: any[]
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.errors = options.errors || {};
        this.validators = options.validators || [];
    }
}
