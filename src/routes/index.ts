import express from "express";
import routesAuth from "./auth.route";
import routesExpense from "./expense.route";
import routesConversation from "./conversation.route";
const router = express.Router();
router.use("/auth", routesAuth);
router.use("/expense", routesExpense);
router.use("/conversation", routesConversation);

export default router;
