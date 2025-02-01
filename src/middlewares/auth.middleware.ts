import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/jwt";
import UserService from "../services/user.service";

export default class AuthMiddleware {
  static async authUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(createHttpError.Unauthorized("Missing Token"));
    }
    const payload = verifyToken(token);
    req.user = await UserService.findUserById(payload._id);
    next();
  }
}
