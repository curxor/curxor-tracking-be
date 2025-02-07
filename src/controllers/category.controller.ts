import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import CategoryService from "../services/category.service";

export default class CategoryController {
  static async createCategory(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.createCategory({
        ...req.body,
        user: req.user,
      }),
    });
  }

  static async enterCategory(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.enterCategory({
        ...req.body,
        user: req.user,
      }),
    });
  }
  static async getCategories(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.getCategories(req.user),
    });
  }
  static async deleteCategory(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.deleteCategory({
        _id: req.params.id,
        user: req.user,
      }),
    });
  }
  static async editCategory(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.editCategory({
        _id: req.params.id,
        user: req.user,
        ...req.body,
      }),
    });
  }
  static async getTransactions(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.getTransactions(req.user),
    });
  }
}
