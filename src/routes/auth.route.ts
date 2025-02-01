import express from "express";
import AuthController from "../controllers/auth.controller";
const routesAuth = express.Router();
routesAuth.get("/test", AuthController.signIn);
export default routesAuth;
