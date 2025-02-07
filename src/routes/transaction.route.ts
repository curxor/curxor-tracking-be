import express from "express";
import controller from "../controllers/transaction.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesTransaction = express.Router();
routesTransaction
  .use(authUser)
  .get("/details", catchError(controller.getTransactionDetails))
  .put("", catchError(controller.editTransaction))
  .get("", catchError(controller.getTransactions))
  .delete("/:id", catchError(controller.deleteTransaction));

export default routesTransaction;
