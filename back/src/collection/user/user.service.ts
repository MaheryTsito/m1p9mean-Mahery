import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AuthenticationResponse, User } from "./user.interface";
import { userModel } from "./user.schema";
import { config } from "../../app/app.config";
import { mailService } from "../../common/mail/mail.service";
import { mailRenderService } from "../../common/mail/mail-render.service";

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

  async getSignedUser(user: User) {
    return {
      user: user,
      token: jwt.sign(
        { _id: user._id, login: user.login },
        config.jwt.secretKey,
        {
          expiresIn: config.jwt.expiration,
        }
      ),
    };
  }

  async login(item: User): Promise<AuthenticationResponse> {
    const client = (await userModel
      .findOne({ login: item.login })
      .exec()) as User;
    const user = {
      _id: client._id,
      login: client.login,
      userType: client.userType,
      firstName: client.firstName,
      lastName: client.lastName,
    };
    return this.getSignedUser(user);
  }

  async signUp(item: User): Promise<AuthenticationResponse | null> {
    delete item._id;
    const isExist = (await userModel
      .findOne({ login: item.login })
      .exec()) as User;
    if (!isExist) {
      item.password = await bcrypt.hash(item.password, 10);
      const user = (await this.create(item)) as User;

      return this.getSignedUser(user);
    }
  }

  async sendSignupSuccessMail(user: User) {
    await mailService.sendMail({
      content: await mailRenderService.renderSignupSuccess(user),
      subject: `Bienvenue ${user.lastName} ${user.firstName} sur E-kaly`,
      to: user.login,
    });
  }
}

export const userService = new UserService();
