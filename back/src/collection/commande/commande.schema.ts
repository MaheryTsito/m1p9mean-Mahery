import * as mongoose from "mongoose";
import { Commande } from "./commande.interface";
import { userSchema } from "../user/user.schema";
import { DishTypeSchema } from "../dish/dish.schema";

export interface CommandeDocument extends Commande, mongoose.Document {}

export const DetailTypeSchema = new mongoose.Schema({
  dish: { type: DishTypeSchema, required: true },
  qty: { type: Number, required: true },
});

export const CommandeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  etat: { type: Boolean, required: true },
  detail: { type: [DetailTypeSchema], required: true },
  client: { type: userSchema, required: true },
  delivery_man: { type: Number, required: true },
  delivery_price: { type: Number, required: true },
  delivery_place: { type: String, required: true },
});

export const CommandeModel = mongoose.model<CommandeDocument>(
  "Commande",
  CommandeSchema
);
