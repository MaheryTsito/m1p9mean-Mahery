import { User } from "../user/user.interface";
import { DishType } from "../dish/dish.interface";

export const DELVERY_PRICE: Number = 3000;

export interface DetailType {
  dish: DishType;
  qty: Number;
}

export interface Commande {
  _id?: any;
  date: Date;
  etat: Boolean;
  detail: DetailType[];
  client: User;
  delivery_man: User;
  delivery_price: Number;
  delivery_place: String;
}
