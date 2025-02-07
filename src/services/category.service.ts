import { createCategoryDto } from "../dtos/category/create-category.dto";
import { Category, CategoryDocument } from "../models/category.model";
import { ICategory } from "../interfaces/category";
import { IUser } from "../models/user.model";
import { editCategoryDto } from "../dtos/category/edit-category.dto";
import { convertToObjectId } from "../utils/objectId";
import createHttpError from "http-errors";
import { deleteCategoryDto } from "../dtos/category/delete-category.dto";

export default class CategoryService {
  static async createCategory(
    createCategoryDto: createCategoryDto
  ): Promise<CategoryDocument> {
    return await Category.create({
      ...createCategoryDto,
    });
  }

  private static async findCategory(
    _id: string,
    user: IUser
  ): Promise<CategoryDocument> {
    const category = await Category.findById(convertToObjectId(_id));
    if (!category || category.user.toString() !== user._id.toString()) {
      throw createHttpError.BadRequest("Category not found");
    }
    return category;
  }

  static async editCategory(editCategory: editCategoryDto): Promise<ICategory> {
    const { _id, user } = editCategory;
    const category = await this.findCategory(_id, user);
    await category.updateOne(category);
    return category;
  }

  static async deleteCategory(
    deleteCategory: deleteCategoryDto
  ): Promise<void> {
    const { _id, user } = deleteCategory;
    const category = await this.findCategory(_id, user);
    await category.deleteOne();
  }
  static async getCategories(user: IUser): Promise<ICategory[]> {
    return await Category.find({
      user: user._id,
    })
      .lean<ICategory[]>()
      .exec();
  }
}
