import { createCategoryDto } from "../dtos/category/create-category.dto";
import { Category, ICategory } from "../models/category.model";
import { Transaction, ITransaction } from "../models/transaction.model";
import { enterCategoryDto } from "../dtos/category/enter-category.dto";
import { IUser } from "../models/user.model";
import { editCategoryDto } from "../dtos/category/edit-category.dto";
import { convertToObjectId } from "../utils/objectId";
import createHttpError from "http-errors";
import { CATEGORY_TYPE } from "../constants/category-type";
import { deleteCategoryDto } from "../dtos/category/delete-category.dto";

export default class CategoryService {
  static async createCategory(
    createCategoryDto: createCategoryDto
  ): Promise<ICategory> {
    return await Category.create({
      ...createCategoryDto,
    });
  }

  static async editCategory(editCategory: editCategoryDto): Promise<ICategory> {
    const { _id, user } = editCategory;
    const category = await Category.findById(convertToObjectId(_id));
    if (!category || category.user.toString() !== user._id.toString()) {
      throw createHttpError.BadRequest("Category not found");
    }
    return category.updateOne(editCategory);
  }
  static async deleteCategory(
    deleteCategory: deleteCategoryDto
  ): Promise<void> {
    const { _id, user } = deleteCategory;
    const category = await Category.findById(convertToObjectId(_id));
    if (!category || category.user.toString() !== user._id.toString()) {
      throw createHttpError.BadRequest("Category not found");
    }
    await category.deleteOne({ _id });
  }
  static async enterCategory(
    enterCategory: enterCategoryDto
  ): Promise<ITransaction> {
    return await Transaction.create(enterCategory);
  }
  static async getTransactions(user: IUser): Promise<ITransaction[]> {
    return await Transaction.find({ user: user._id })
      .populate("category")
      .sort({ createdAt: -1 });
  }
  static async getCategoryExpense(user: IUser): Promise<ICategory[]> {
    return await Category.find({
      user: user._id,
      type: CATEGORY_TYPE.EXPENSE,
    })
      .lean()
      .exec();
  }
  static async getCategoryIncome(user: IUser): Promise<ICategory[]> {
    return await Category.find({
      user: user._id,
      type: CATEGORY_TYPE.INCOME,
    })
      .lean()
      .exec();
  }
  static async getCategories(user: IUser): Promise<ICategory[]> {
    return await Category.find({
      user: user._id,
    })
      .lean()
      .exec();
  }
}
