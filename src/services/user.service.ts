import { ObjectId } from "mongoose";
import { User, IUser } from "../models/user.model";
import createHttpError from "http-errors";
import TransactionRepository from "../repositories/transaction.repo";
import { getProfileDto } from "../dtos/user/get-profile.dto";

export default class UserService {
  private static async findUserOrThrow(
    query: object,
    errorMessage: string
  ): Promise<IUser> {
    const user = await User.findOne(query);
    if (!user) throw new createHttpError.BadRequest(errorMessage);
    return user;
  }

  static async findUserByEmail(email: string): Promise<IUser> {
    return this.findUserOrThrow({ email }, "User not found");
  }

  static async findUserById(_id: ObjectId): Promise<IUser> {
    return this.findUserOrThrow({ _id }, "User not found");
  }

  static async createUser(email: string): Promise<IUser> {
    return await User.create({ email });
  }

  static async findUserByEmailOrCreate(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user) {
      await this.createUser(email);
    }
  }
  static async getProfile(getProfile: getProfileDto): Promise<any> {
    const { user, startDate, endDate } = getProfile;
    const { _id } = user;

    const [expense, income, balanceAllTime] = await Promise.all([
      TransactionRepository.calculateExpense(_id, startDate, endDate),
      TransactionRepository.calculateIncome(_id, startDate, endDate),
      TransactionRepository.calculateBalanceAllTime(_id),
    ]);
    const balance = income + expense;
    return { user, expense, income, balance, balanceAllTime };
  }
}
