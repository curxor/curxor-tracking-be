import CategoryService from "../src/services/category.service";
import { Category } from "../src/models/category.model";
import { Types } from "mongoose";
import {
  mockCategory,
  mockUser,
  mockCategories,
} from "../src/mocks/category.mock";
import { editCategoryDto } from "../src/dtos/category/edit-category.dto";

jest.mock("../src/models/category.model");

describe("CategoryService", () => {
  let mockCategoryId: Types.ObjectId;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCategoryId = new Types.ObjectId();
  });

  //#region #01_Tạo danh mục thành công
  test("Tạo danh mục loại thành công", async () => {
    const createdCategory = { _id: mockCategoryId, ...mockCategory };
    (Category.create as jest.Mock).mockResolvedValue(createdCategory);

    const result = await CategoryService.createCategory(mockCategory);

    expect(Category.create).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(createdCategory);
  });
  //#endregion
  //#region #02_Cập nhật danh mục thành công
  // test("Cập nhật danh mục thành công", async () => {
  //   const existingCategory = {
  //     _id: mockCategoryId,
  //     ...mockCategory,
  //     updateOne: jest.fn().mockResolvedValue(undefined),
  //   };

  //   (Category.findById as jest.Mock).mockResolvedValue(existingCategory);

  //   const updatedCategory: editCategoryDto = {
  //     _id: mockCategoryId.toHexString(),
  //     name: "Shopping",
  //     user: mockUser,
  //     description: "Shopping offline",
  //     icon: "🛒",
  //     type: "expense",
  //   };

  //   const result = await CategoryService.editCategory(updatedCategory);

  //   expect(Category.findById).toHaveBeenCalledWith(mockCategoryId);
  //   expect(existingCategory.updateOne).toHaveBeenCalledWith({
  //     $set: updatedCategory,
  //   });
  //   expect(result.name).toBe("Shopping");
  // });
  //#endregion
  //#region #04 Test các loại danh mục khác nhau
  test.each(mockCategories)("Kiểm tra danh mục '%s'", async (category) => {
    (Category.create as jest.Mock).mockResolvedValue(category);

    const result = await CategoryService.createCategory(category);

    expect(Category.create).toHaveBeenCalledWith(category);
    expect(result).toEqual(category);
  });
  //#endregion
  //#region #05_Xóa danh mục thành công
  // test("Xóa danh mục thành công", async () => {
  //   (Category.findById as jest.Mock).mockResolvedValue({
  //     ...mockCategory,
  //     deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  //   });

  //   await expect(
  //     CategoryService.deleteCategory({
  //       _id: mockCategoryId.toHexString(),
  //       user: mockUser,
  //     })
  //   ).resolves.toBeUndefined();

  //   expect(Category.findById).toHaveBeenCalledWith(mockCategoryId);
  // });
  //#endregion
  //#region #06_Báo lỗi khi không tìm thấy danh mục để xóa
  test("Báo lỗi khi xóa danh mục không tồn tại", async () => {
    (Category.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      CategoryService.deleteCategory({
        _id: mockCategoryId.toHexString(),
        user: mockUser,
      })
    ).rejects.toThrow("Category not found");
  });
  //#endregion
  //#region #07_Lấy danh mục theo user
  test("Lấy tất cả danh mục theo user", async () => {
    (Category.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockCategories),
    });

    const result = await CategoryService.getCategories(mockUser);

    expect(Category.find).toHaveBeenCalledWith({ user: mockUser._id });
    expect(result).toEqual(mockCategories);
  });
  //#endregion

  //#region #08_Báo lỗi khi không tìm thấy danh mục khi cập nhật
  test("Báo lỗi khi cập nhật danh mục không tồn tại", async () => {
    (Category.findById as jest.Mock).mockResolvedValue(null);

    const updatedCategory: editCategoryDto = {
      _id: mockCategoryId.toHexString(),
      ...mockCategory,
      name: "Invalid",
    };

    await expect(CategoryService.editCategory(updatedCategory)).rejects.toThrow(
      "Category not found"
    );
  });
  //#endregion
});
