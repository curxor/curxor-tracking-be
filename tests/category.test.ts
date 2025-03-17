// import CategoryService from "../src/services/category.service";
// import { Category } from "../src/models/category.model";
// import { ICategory } from "../src/interfaces/category.interface";
// import { convertToObjectId } from "../src/utils/objectId";
// jest.mock("../src/services/category.service");

// describe("Category Function Test", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it("Create Category", async () => {
//     (CategoryService.createCategory as jest.Mock).mockResolvedValue(undefined);
//     await CategoryService.createCategory("test");
//     expect(CategoryService.createCategory).toHaveBeenCalledWith("test");
//   });
//   it("Update Category", async () => {
//     (CategoryService.updateCategory as jest.Mock).mockResolvedValue(undefined);
//     await CategoryService.updateCategory("test");
//     expect(CategoryService.updateCategory).toHaveBeenCalledWith("test");
//   });
//   it("Delete Category", async () => {
//     (CategoryService.deleteCategory as jest.Mock).mockResolvedValue(undefined);
//     await CategoryService.deleteCategory("test");
//     expect(CategoryService.deleteCategory).toHaveBeenCalledWith("test");
//   });
//   it("Get All Category", async () => {
//     (CategoryService.getAllCategory as jest.Mock).mockResolvedValue(undefined);
//     await CategoryService.getAllCategory();
//     expect(CategoryService.getAllCategory).toHaveBeenCalled();
//   });
// });
//#region 02
// import CategoryService from "../src/services/category.service";
// import { Category } from "../src/models/category.model";
// import { convertToObjectId } from "../src/utils/objectId";
// import { Types } from "mongoose";
// import { IUser } from "../src/models/user.model";
// import createHttpError from "http-errors";

// jest.mock("../models/category.model");

// describe("CategoryService", () => {
//   const mockUser: IUser = {
//     _id: new Types.ObjectId(), // Tạo ObjectId hợp lệ
//     name: "Bao Ngoc",
//     email: "test@example.com",
//     avatar: "https://example.com/avatar.png",
//     balance: 1000,
//   };

//   const mockCategory: createCategoryDto = {
//     _id: convertToObjectId("category123"),
//     name: "Food",
//     description: "Monthly food budget",
//     icon: "🍕",
//     type: "expense",
//     amount: 100,
//     user: mockUser, // Thay vì "user123"
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should create a new category", async () => {
//     (Category.create as jest.Mock).mockResolvedValue(mockCategory);

//     const result = await CategoryService.createCategory(mockCategory);

//     expect(Category.create).toHaveBeenCalledWith(mockCategory);
//     expect(result).toEqual(mockCategory);
//   });

//   test("should get categories by user", async () => {
//     (Category.find as jest.Mock).mockReturnValue({
//       lean: jest.fn().mockReturnThis(),
//       exec: jest.fn().mockResolvedValue([mockCategory]),
//     });

//     const result = await CategoryService.getCategories(mockUser);

//     expect(Category.find).toHaveBeenCalledWith({ user: mockUser._id });
//     expect(result).toEqual([mockCategory]);
//   });

//   test("should edit an existing category", async () => {
//     (Category.findById as jest.Mock).mockResolvedValue({
//       ...mockCategory,
//       updateOne: jest.fn().mockResolvedValue(undefined),
//     });

//     const updatedCategory = { ...mockCategory, name: "Groceries" };
//     const result = await CategoryService.editCategory(updatedCategory);

//     expect(Category.findById).toHaveBeenCalledWith(
//       convertToObjectId(updatedCategory._id)
//     );
//     expect(result.name).toBe("Groceries");
//   });

//   test("should throw error if category not found when editing", async () => {
//     (Category.findById as jest.Mock).mockResolvedValue(null);

//     await expect(
//       CategoryService.editCategory({ ...mockCategory, name: "Travel" })
//     ).rejects.toThrow("Category not found");
//   });

//   test("should delete a category", async () => {
//     (Category.findById as jest.Mock).mockResolvedValue({
//       ...mockCategory,
//       deleteOne: jest.fn().mockResolvedValue(undefined),
//     });

//     await expect(
//       CategoryService.deleteCategory({ _id: mockCategory._id, user: mockUser })
//     ).resolves.toBeUndefined();

//     expect(Category.findById).toHaveBeenCalledWith(
//       convertToObjectId(mockCategory._id)
//     );
//   });

//   test("should throw error if category not found when deleting", async () => {
//     (Category.findById as jest.Mock).mockResolvedValue(null);

//     await expect(
//       CategoryService.deleteCategory({ _id: "invalid_id", user: mockUser })
//     ).rejects.toThrow("Category not found");
//   });
// });
//#endregion
import CategoryService from "../src/services/category.service";
import { Category } from "../src/models/category.model";
import { convertToObjectId } from "../src/utils/objectId";
import { Types } from "mongoose";
import { IUser } from "../src/models/user.model";
import createHttpError from "http-errors";
import { createCategoryDto } from "../src/dtos/category/create-category.dto";
import { editCategoryDto } from "../src/dtos/category/edit-category.dto"; // Import editCategoryDto

jest.mock("../src/models/category.model");

describe("CategoryService", () => {
  // Tạo mock user
  const mockUser: IUser = {
    _id: new Types.ObjectId(),
    name: "Bao Ngoc",
    email: "ngoc@example.com",
    avatar: "https://example.com/avatar.png",
    balance: 1000,
  };
  //Tạo mock category
  const mockCategory: createCategoryDto = {
    name: "Food",
    description: "Monthly food budget",
    icon: "🍕🍕",
    type: "expense",
    // amount: 100,
    user: mockUser,
  };

  //Tạo objectId mới
  let mockCategoryId: Types.ObjectId;

  // Tạo ObjectId mới cho mỗi ngoc
  beforeEach(() => {
    jest.clearAllMocks();
    mockCategoryId = new Types.ObjectId();
  });
  //#region UTCID01
  test("Tạo danh mục loại", async () => {
    const createdCategory = { _id: mockCategoryId, ...mockCategory };
    (Category.create as jest.Mock).mockResolvedValue(createdCategory);
    // (Category.create as jest.Mock).mockResolvedValue(null); // Trả về null để test lỗi

    const result = await CategoryService.createCategory(mockCategory);

    expect(Category.create).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(createdCategory);
  });
  //#endregion
  //#region UTCID02
  test("Lấy danh mục loại", async () => {
    const categoryWithId = { _id: mockCategoryId, ...mockCategory };
    (Category.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([categoryWithId]),
    });
    // Tra ve mang rong
    // (Category.find as jest.Mock).mockReturnValue({
    //   lean: jest.fn().mockReturnThis(),
    //   exec: jest.fn().mockResolvedValue([]),
    // });
    const result = await CategoryService.getCategories(mockUser);
    expect(Category.find).toHaveBeenCalledWith({ user: mockUser._id });
    expect(result).toEqual([categoryWithId]);
  });
  //#endregion
  //#region UTCID03
  // test("Cập nhật loại", async () => {
  //   const existingCategory = { _id: mockCategoryId, ...mockCategory };
  //   (Category.findById as jest.Mock).mockResolvedValue({
  //     _id: new Types.ObjectId(mockCategoryId), // ✅ Trả về ObjectId hợp lệ
  //     user: new Types.ObjectId(mockUser._id), // ✅ Đảm bảo user là ObjectId
  //     updateOne: jest.fn().mockResolvedValue(undefined),
  //   });

  //   const updatedCategory: editCategoryDto = {
  //     // _id: mockCategoryId,
  //     _id: mockCategoryId.toHexString(),
  //     name: "Shopping",
  //     user: mockUser,
  //     description: "Shopping offline",
  //     icon: "🍕",
  //     type: "expense",
  //   };
  //   const result = await CategoryService.editCategory(updatedCategory);

  //   expect(Category.findById).toHaveBeenCalledWith(mockCategoryId);
  //   expect(result.name).toBe("Shopping");
  // });
  //#endregion
  //#region UTCID04
  test("Báo lỗi khi không tim thấy loại sửa", async () => {
    (Category.findById as jest.Mock).mockResolvedValue(null);
    const updatedCategory: editCategoryDto = {
      // _id: new Types.ObjectId(), // Tạo ObjectId mới cho trường hợp không tìm thấy
      _id: new Types.ObjectId().toHexString(),
      name: "Travel",
      user: mockUser,
      description: "Travel around the world",
      icon: "🍕",
      type: "expense",
    };
    await expect(CategoryService.editCategory(updatedCategory)).rejects.toThrow(
      "Category not found"
    );
  });
  //#endregion
  //#region UTCID05
  // test("Xóa loại", async () => {
  //   const existingCategory = { _id: mockCategoryId, ...mockCategory };
  //   (Category.findById as jest.Mock).mockResolvedValue({
  //     _id: new Types.ObjectId(mockCategoryId),
  //     user: new Types.ObjectId(mockUser._id),
  //     deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }), // ✅ Trả về deletedCount để tránh lỗi
  //   });
  //   await expect(
  //     CategoryService.deleteCategory({
  //       _id: mockCategoryId.toHexString(),
  //       user: mockUser,
  //     })
  //   ).resolves.toBeUndefined();
  //   expect(Category.findById).toHaveBeenCalledWith(
  //     convertToObjectId(mockCategoryId.toHexString())
  //   ); // ✅ Chuyển về ObjectId

  //   // expect(Category.findById).toHaveBeenCalledWith(mockCategoryId);
  // });
  //#endregion
  //#region UTCID06
  test("Xóa không tìm thấy loại", async () => {
    (Category.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      CategoryService.deleteCategory({
        _id: new Types.ObjectId().toHexString(),
        user: mockUser,
      })
    ).rejects.toThrow("Category not found");
  });
  //#endregion
});
