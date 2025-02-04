import { ObjectId } from "mongoose";
import { createExpenseDto } from "../dtos/expense/create-expense.dto";
import { Expense, IExpense } from "../models/expense.model";
import { Transaction, ITransaction } from "../models/transaction.model";
import { enterExpenseDto } from "../dtos/expense/enter-expense.dto";
import { IUser } from "../models/user.model";

export default class ExpenseService {
  static async createExpense(
    createExpenseDto: createExpenseDto
  ): Promise<IExpense> {
    return await Expense.create(createExpenseDto);
  }
  static async deleteExpense(id: ObjectId): Promise<void> {
    await Expense.findByIdAndDelete(id);
  }
  static async enterExpense(
    enterExpense: enterExpenseDto
  ): Promise<ITransaction> {
    return await Transaction.create(enterExpense);
  }
  static async getTransactions(user: IUser): Promise<ITransaction[]> {
    return await Transaction.find({ user: user._id })
      .populate("expense")
      .sort({ createdAt: -1 });
  }
  static async getExpense(user: IUser): Promise<IExpense[]> {
    return await Expense.find({ user: user._id }).select(["name"]);
  }
}
