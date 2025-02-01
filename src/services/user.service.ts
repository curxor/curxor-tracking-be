import { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import { IUser } from "../models/user.model";
export default class UserService {
  static async findUserByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }
  static async findUserById(_id: ObjectId): Promise<IUser> {
    return await User.findById(_id);
  }
  static async createUser(email: string): Promise<IUser> {
    return await User.create({ email });
  }
}
