import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { AuthRequest } from "../interfaces/request";
export default class AuthController {
  static signIn = async (req: Request, res: Response) => {
    await AuthService.signIn(req.body.email);
    return res.json({ message: "ok", status: 200 });
  };
  static verifySignIn = async (req: Request, res: Response) => {
    return res.json({
      message: "ok",
      status: 200,
      data: await AuthService.verifySignIn({ ...req.body }),
    });
  };
  static profile = async (req: AuthRequest, res: Response) => {
    return res.json({
      message: "ok",
      status: 200,
      data: req?.user,
    });
  };
}
