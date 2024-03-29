import { DishModel } from "./dish.schema";
import { DishType } from "./dish.interface";

class DishService {
  async getAll(): Promise<DishType[] | null> {
    return DishModel.find().exec();
  }

  async create(item: DishType): Promise<DishType> {
    return DishModel.create(item);
  }

  async getById(id: string): Promise<DishType> {
    return DishModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    return DishModel.deleteOne({ _id: id }).then(() => true);
  }

  async update(item: DishType): Promise<DishType | null> {
    return DishModel.findByIdAndUpdate(item._id, item, { new: true }).exec();
  }
}

export const dishService = new DishService();
