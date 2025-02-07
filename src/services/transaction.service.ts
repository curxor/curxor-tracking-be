import createHttpError from "http-errors";
import { ITransaction, Transaction } from "../models/transaction.model";
import { IUser } from "../models/user.model";
import { convertToObjectId } from "../utils/objectId";
import { editTransactionDto } from "../dtos/transaction/edit-transaction.dto";

export default class TransactionService {
  private static async findTransaction(
    user: IUser,
    _id: string
  ): Promise<ITransaction> {
    const transaction = await Transaction.findOne({
      user: user._id,
      _id: convertToObjectId(_id),
    });
    if (!transaction) {
      throw createHttpError(404, "Transaction not found");
    }
    return transaction;
  }

  static async getTransactionDetails(
    user: IUser,
    _id: string
  ): Promise<ITransaction> {
    return this.findTransaction(user, _id);
  }

  static async editTransaction(
    editTransaction: editTransactionDto,
    user: IUser
  ): Promise<void> {
    const { _id } = editTransaction;
    const transaction = await this.findTransaction(user, _id);
    await transaction.updateOne(editTransaction);
  }
  static async deleteTransaction(user: IUser, _id: string): Promise<void> {
    const transaction = await this.findTransaction(user, _id);
    await transaction.deleteOne();
  }
}
