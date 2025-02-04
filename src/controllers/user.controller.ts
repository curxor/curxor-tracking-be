import { AuthRequest } from "../interfaces/request";
import { Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    const { startDate, endDate } = req.query;
    const data = await UserService.getProfile({
      startDate: startDate as string,
      endDate: endDate as string,
      user: req.user,
    });
    return res.json({
      message: "ok",
      status: 200,
      data,
    });
  }
}
