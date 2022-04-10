import { User } from "../user/user.interface";
import { CommandeModel } from "./commande.schema";
import { userService } from "../user/user.service";
import { dishService } from "../dish/dish.service";
import { Commande, DELIVERY_PRICE, DetailType } from "./commande.interface";

class CommandeService {
  async getAll(): Promise<Commande[] | null> {
    return CommandeModel.find().exec();
  }

  async create(item: Commande): Promise<Commande> {
    return CommandeModel.create(item);
  }

  async getById(id: string): Promise<Commande | null> {
    return CommandeModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    return CommandeModel.deleteOne({ _id: id }).then(() => true);
  }

  async update(item: Commande): Promise<Commande | null> {
    return CommandeModel.findByIdAndUpdate(item._id, item, {
      new: true,
    }).exec();
  }
}
export const commandeService = new CommandeService();
