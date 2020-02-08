import {User} from './user';
import {Vehicle} from "./vehicle";

export class Delivery {
  id:number;
  invoices:string[] = [""];
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
  fixedDeliveryId:number;
}

export enum DeliveryType {
  firstDayPart=1,
  secondDayPart=2,
  internalDelivery=3
}
export let DeliveryTypeNames = {
  1:"Первая половина",
  2:"Вторая половина",
  3:"Внутренние доставки"
};

export class DeliveryCountByDate {
  count?: number;
  type?: number;
  datetime?: string;
}
