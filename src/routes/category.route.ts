import express from "express";
import CategoryController from "../controllers/category.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
const routesCategory = express.Router();
routesCategory.use(authUser);
routesCategory
  .post("/create-expense", catchError(CategoryController.createCategoryExpense))
  .post("/create-income", catchError(CategoryController.createCategoryIncome))
  .post("/enter", catchError(CategoryController.enterCategory))
  .get("/expense", catchError(CategoryController.getCategoryExpense))
  .get("/income", catchError(CategoryController.getCategoryIncome))
  .get("", catchError(CategoryController.getCategories))
  .put("/:id", catchError(CategoryController.editCategory))
  .delete("/:id", catchError(CategoryController.deleteCategory))
  .get("/transactions", catchError(CategoryController.getTransactions));
export default routesCategory;
