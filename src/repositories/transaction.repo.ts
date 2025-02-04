import { Types } from "mongoose";
import { Transaction } from "../models/transaction.model";

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
}
