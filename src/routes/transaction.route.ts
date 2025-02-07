import express from "express";
import controller from "../controllers/transaction.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesTransaction = express.Router();
routesTransaction
  .get("/details", authUser, catchError(controller.getTransactionDetails))
  .put("", authUser, catchError(controller.editTransaction))
  .delete("/:id", authUser, catchError(controller.deleteTransaction));

export default routesTransaction;
