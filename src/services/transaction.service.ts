import createHttpError from "http-errors";
import { Transaction, TransactionDocument } from "../models/transaction.model";
import { ITransaction } from "../interfaces/transaction";
import { IUser } from "../models/user.model";
import { convertToObjectId } from "../utils/objectId";
import { editTransactionDto } from "../dtos/transaction/edit-transaction.dto";
import { getTransactionDto } from "../dtos/transaction/get-transaction.dto";
import TransactionRepository from "../repositories/transaction.repo";

export default class TransactionService {
  //#region findTransaction
  private static async findTransaction(
    user: IUser,
    _id: string
  ): Promise<TransactionDocument> {
    const transaction = await Transaction.findOne({
      user: user._id,
      _id: convertToObjectId(_id),
    });
    if (!transaction) {
      throw createHttpError(404, "Transaction not found");
    }
    return transaction;
  }
  //#endregion
  //#region getTransactionDetails
  static async getTransactionDetails(
    user: IUser,
    _id: string
  ): Promise<TransactionDocument> {
    return this.findTransaction(user, _id);
  }
  //#endregion
  //#region editTransaction
  static async editTransaction(
    editTransaction: editTransactionDto,
    user: IUser
  ): Promise<void> {
    const { _id } = editTransaction;
    const transaction = await this.findTransaction(user, _id);
    await transaction.updateOne(editTransaction);
  }
  //#endregion
  //#region deleteTransaction
  static async deleteTransaction(user: IUser, _id: string): Promise<void> {
    const transaction = await this.findTransaction(user, _id);
    await transaction.deleteOne();
  }
  //#endregion
  //#region getTransactions
  static async getTransactions(
    getTransactions: getTransactionDto
  ): Promise<any> {
    const { user, limit, search } = getTransactions;
    const query: any = { user };
    // if (search) {
    //   query.$or = [
    //     { description: { $regex: search, $options: "i" } },
    //     // { "category.name": { $regex: search, $options: "i" } },
    //   ];
    // }
    const [transactions, count] = await Promise.all([
      TransactionRepository.getTransactions({
        ...getTransactions,
        query,
      }),
      TransactionRepository.getTransactionCount(query),
    ]);
    return { transactions, pageCount: Math.ceil(count / limit), total: count };
  }
  //#endregion
}
