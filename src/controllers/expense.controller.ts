import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import ExpenseService from "../services/expense.service";

export default class ExpenseController {
  static async createExpense(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await ExpenseService.createExpense({ ...req.body, user: req.user }),
    });
  }
  static async enterExpense(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await ExpenseService.enterExpense({ ...req.body, user: req.user }),
    });
  }
  static async getTransactions(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await ExpenseService.getTransactions(req.user),
    });
  }
}
