import * as bcrypt from "bcrypt";
import { User } from "./user.interface";
import { userModel } from "./user.schema";

class UserService {
  async getAll(): Promise<User[] | null> {
    return userModel.find().exec();
  }

  async create(item: User): Promise<User> {
    return userModel.create(item);
  }

  async getById(id: string): Promise<User | null> {
    return userModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    return userModel.deleteOne({ _id: id }).then(() => true);
  }

  async update(item: User): Promise<User | null> {
    return userModel.findByIdAndUpdate(item._id, item, { new: true }).exec();
  }

  async comparePassword(
    newPassword: String,
    oldPassword: String
  ): Promise<boolean> {
    const compare = await bcrypt.compare(newPassword, oldPassword);
    return compare;
  }
}

export const userService = new UserService();
