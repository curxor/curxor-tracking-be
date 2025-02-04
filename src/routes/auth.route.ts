import express from "express";
import AuthController from "../controllers/auth.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesAuth = express.Router();
routesAuth.post("/sign-in", catchError(AuthController.signIn));
routesAuth.post("/verify", catchError(AuthController.verifySignIn));
routesAuth.get("/profile", authUser, catchError(AuthController.profile));

export default routesAuth;
