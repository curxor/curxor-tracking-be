import express from "express";
import CategoryController from "../controllers/category.controller";
import catchError from "../middlewares/catch-error.middleware";
import { authUser } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { createCategorySchema } from "../validates/category.validate";
const routesCategory = express.Router();
routesCategory.use(authUser);
routesCategory
  .post(
    "/create",
    validate(createCategorySchema),
    catchError(CategoryController.createCategory)
  )
  .get("", catchError(CategoryController.getCategories))
  .put(
    "/:id",
    validate(createCategorySchema),
    catchError(CategoryController.editCategory)
  )
  .delete("/:id", catchError(CategoryController.deleteCategory));
export default routesCategory;
