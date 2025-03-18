import express from "express";
import AuthController from "../controllers/auth.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { signInSchema, verifySchema } from "../validates/auth.validate";
const routesAuth = express.Router();
routesAuth.post(
  "/sign-in",
  validate(signInSchema),
  catchError(AuthController.signIn)
);
routesAuth.post(
  "/verify",
  validate(verifySchema),
  catchError(AuthController.verifySignIn)
);
routesAuth.get("/profile", authUser, catchError(AuthController.profile));

export default routesAuth;
