import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/jwt";
import UserService from "../services/user.service";
import { AuthRequest } from "../interfaces/request";
import catchError from "./catch-error.middleware";

export default class AuthMiddleware {
  static async authUser(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(createHttpError.Unauthorized("Missing Token"));
    }
    const payload = verifyToken(token);
    const user = await UserService.findUserById(payload._id);
    req.user = user;
    next();
  }
}

export const authUser = catchError(AuthMiddleware.authUser);
