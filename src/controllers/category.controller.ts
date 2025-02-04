import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import CategoryService from "../services/category.service";

export default class CategoryController {
  static async createCategoryIncome(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.createCategoryIncome({
        ...req.body,
        user: req.user,
      }),
    });
  }
  static async createCategoryExpense(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.createCategoryExpense({
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
  static async getCategoryExpense(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.getCategoryExpense(req.user),
    });
  }
  static async getCategoryIncome(req: AuthRequest, res: Response) {
    return res.json({
      message: "ok",
      status: 200,
      data: await CategoryService.getCategoryIncome(req.user),
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
