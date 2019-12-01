import {ControlTypes} from "./control-types.enum";
import {BaseControl} from "./base-control";


export class DeliveryCalendarControl extends BaseControl<Date> {
  controlType = ControlTypes.deliveryCalendar;

  constructor(options: {} = {}) {
    super(options);
  }
}
