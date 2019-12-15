import {User} from './user';
import {Vehicle} from "./vehicle";

export class Delivery {
  id:number;
  invoices:string[] = ["Тест счет"];
  organization = '';
  address = '';
  phone = '';
  recipientName = '';
  comment = '';
  createdTime:Date;
  dateTime:Date;
  type:DeliveryType;
  time:string;
  vehicleAssignTime:Date;
  completedTime:Date;
  completed = false;
  vehicleId:number;
  vehicle: Vehicle;
  createrUserId:number;
  createrUser: User;
}

export enum DeliveryType {
  firstDayPart=0,
  secondDayPart=1,
  internalDelivery=2
}

export class DeliveryCountByDate {
  count?: number;
  type?: number;
  datetime?: string;
}
