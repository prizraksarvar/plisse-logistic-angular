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
  vehicleAssignTime:Date;
  completedTime:Date;
  completed = false;
  vehicleId:number;
  vehicle: Vehicle;
  createrUserId:number;
  createrUser: User;
}
