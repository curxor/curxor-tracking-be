import express from "express";
import controller from "../controllers/conversation.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
const route = express.Router();
route.post("/start", authUser, catchError(controller.startConversation));
route.post("/get-messages", authUser, catchError(controller.getMessages));
route.post(
  "/send-message",
  upload,
  authUser,
  catchError(controller.sendMessage)
);

export default route;
