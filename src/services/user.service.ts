import { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import { IUser } from "../models/user.model";
import createHttpError from "http-errors";
export default class UserService {
  static async findUserByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) throw new createHttpError.BadRequest("User not found");
    return user;
  }
  static async findUserByEmailOrCreate(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user) {
      await this.createUser(email);
    }
  }
  static async findUserById(_id: ObjectId): Promise<IUser> {
    const user = await User.findById(_id);
    if (!user) throw new createHttpError.BadRequest("User not found");
    return user;
  }
  static async createUser(email: string): Promise<IUser> {
    return await User.create({ email });
  }
}
