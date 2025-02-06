import createHttpError from "http-errors";
import { ITransaction, Transaction } from "../models/transaction.model";
import { IUser } from "../models/user.model";
import { convertToObjectId } from "../utils/objectId";
import { editTransactionDto } from "../dtos/transaction/edit-transaction.dto";

export default class TransactionService {
  static async getTransactionDetails(
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

  static async editTransaction(
    editTransaction: editTransactionDto
  ): Promise<void> {
    const { user, _id } = editTransaction;
    const transaction = await Transaction.findOne({
      user: user._id,
      _id: convertToObjectId(_id),
    });
    if (!transaction) {
      throw createHttpError(404, "Transaction not found");
    }

    await transaction.updateOne(editTransaction);
  }
}
