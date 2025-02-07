import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import TransactionService from "../services/transaction.service";

export default class TransactionController {
  static async getTransactionDetails(req: AuthRequest, res: Response) {
    const { id } = req.query;
    const rs = await TransactionService.getTransactionDetails(
      req.user,
      id as string
    );
    return res.json({ message: "ok", status: 200, data: rs });
  }
  static async editTransaction(req: AuthRequest, res: Response) {
    const rs = await TransactionService.editTransaction(
      {
        ...req.body,
      },
      req.user
    );
    return res.json({ message: "ok", status: 200, data: rs });
  }
  static async deleteTransaction(req: AuthRequest, res: Response) {
    const rs = await TransactionService.deleteTransaction(
      req.user,
      req.params.id as string
    );
    return res.json({ message: "ok", status: 200, data: rs });
  }
  static async getTransactions(req: AuthRequest, res: Response) {
    const { limit = "10", page = "1", search } = req.query;
    return res.json({
      message: "ok",
      status: 200,
      data: await TransactionService.getTransactions({
        user: req.user,
        limit: parseInt(limit as string, 10),
        page: parseInt(page as string, 10),
        search: search as string,
      }),
    });
  }
}
