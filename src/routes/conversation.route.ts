import express from "express";
import ConversationController from "../controllers/conversation.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesConversation = express.Router();
routesConversation.post(
  "/start",
  authUser,
  catchError(ConversationController.startConversation)
);
routesConversation.post(
  "/get-messages",
  authUser,
  catchError(ConversationController.getMessages)
);
routesConversation.post(
  "/send-message",
  authUser,
  catchError(ConversationController.sendMessage)
);

export default routesConversation;
