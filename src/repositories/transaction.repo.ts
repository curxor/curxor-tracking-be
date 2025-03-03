import { Types } from "mongoose";
import { Transaction } from "../models/transaction.model";
import { ITransaction } from "../interfaces/transaction";
import {
  getTransactionDto,
  getTransactionRepoDto,
} from "../dtos/transaction/get-transaction.dto";

export default class TransactionRepository {
  static async calculateExpense(
    userId: Types.ObjectId,
    startDate: string,
    endDate: string
  ) {
    const result = await Transaction.aggregate([
      {
        $match: {
          amount: { $lt: 0 },
          user: userId,
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    return result[0]?.totalAmount || 0;
  }
  static async calculateIncome(
    userId: Types.ObjectId,
    startDate: string,
    endDate: string
  ) {
    const result = await Transaction.aggregate([
      {
        $match: {
          amount: { $gt: 0 },
          user: userId,
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    return result[0]?.totalAmount || 0;
  }
  static async calculateBalanceAllTime(userId: Types.ObjectId) {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    return result[0]?.totalAmount || 0;
  }
  static async getTransactions(
    transaction: getTransactionRepoDto
  ): Promise<ITransaction[]> {
    const { limit, page, query } = transaction;
    return await Transaction.find(query)
      .select("description amount category createdAt")
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("category")
      .sort({ createdAt: -1 })
      .lean<ITransaction[]>()
      .exec();
  }
  static async getTransactionCount(query: any): Promise<number> {
    return await Transaction.countDocuments(query);
  }
}
