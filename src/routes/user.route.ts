import express from "express";
import UserController from "../controllers/user.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesUser = express.Router();
routesUser.get("/profile", authUser, catchError(UserController.getProfile));

export default routesUser;
