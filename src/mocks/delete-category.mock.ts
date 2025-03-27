import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import { deleteCategoryDto } from "../dtos/category/delete-category.dto";

export const createMockUser = (override?: Partial<IUser>): IUser => ({
  _id: new Types.ObjectId(),
  name: "Bao Ngoc",
  email: "ngoc@example.com",
  avatar: "https://example.com/avatar.png",
  balance: 1000,
  ...override,
});

export const createMockDeleteCategory = (
  override?: Partial<deleteCategoryDto>
): deleteCategoryDto => ({
  _id: new Types.ObjectId().toString(),
  user: createMockUser(),
  ...override,
});

export const validDeleteCategoryData = createMockDeleteCategory();

export const deleteCategoryTestCases = [
  {
    title: "✅ Xóa danh mục thành công",
    input: createMockDeleteCategory(),
    expected: undefined,
  },
  {
    title: "❌ Lỗi khi thiếu ID",
    input: createMockDeleteCategory({
      _id: "",
      user: createMockUser(),
    }),
    expected: new Error("ID is required"),
  },
  {
    title: "❌ Lỗi khi thiếu ID",
    input: createMockDeleteCategory({
      _id: new Types.ObjectId().toString(),
      user: undefined,
    }),
    expected: new Error("ID is required"),
  },
];
