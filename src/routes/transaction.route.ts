import express from "express";
import TransactionController from "../controllers/transaction.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesTransaction = express.Router();
routesTransaction
  .get(
    "/details",
    authUser,
    catchError(TransactionController.getTransactionDetails)
  )
  .put("", authUser, catchError(TransactionController.editTransaction));

export default routesTransaction;
