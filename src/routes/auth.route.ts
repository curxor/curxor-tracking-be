import express from "express";
import AuthController from "../controllers/auth.controller";
import catchError from "../middlewares/catch-error.middleware";
const routesAuth = express.Router();
routesAuth.post("/sign-in", catchError(AuthController.signIn));
routesAuth.post("/verify", catchError(AuthController.verifySignIn));

export default routesAuth;
