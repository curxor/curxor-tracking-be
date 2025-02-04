import express from "express";
import ExpenseController from "../controllers/expense.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesExpense = express.Router();
routesExpense.post(
  "/create",
  authUser,
  catchError(ExpenseController.createExpense)
);
routesExpense.post(
  "/enter",
  authUser,
  catchError(ExpenseController.enterExpense)
);
routesExpense.get(
  "/transactions",
  authUser,
  catchError(ExpenseController.getTransactions)
);
export default routesExpense;
