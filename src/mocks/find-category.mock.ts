import { Types } from "mongoose";
import { findCategorySchema } from "../validates/category.validate";
import { IUser } from "../models/user.model";

export const createMockUser = (override?: Partial<IUser>): IUser => ({
  _id: new Types.ObjectId(),
  name: "Bao Ngoc",
  email: "ngoc@example.com",
  avatar: "https://example.com/avatar.png",
  balance: 1000,
  ...override,
});

export const createMockFindCategory = (override?: Partial<any>) => ({
  _id: new Types.ObjectId().toString(),
  user: createMockUser(),
  ...override,
});

export const validFindCategoryData = createMockFindCategory();

export const findCategoryTestCases = [
  {
    title: "✅ Tìm kiếm danh mục thành công",
    input: createMockFindCategory(),
    expected: expect.objectContaining(validFindCategoryData),
  },
  {
    title: "❌ Lỗi khi thiếu ID",
    input: createMockFindCategory({ _id: "" }),
    expected: new Error("Category not found"),
  },
  {
    title: "❌ Lỗi khi thiếu user ID",
    input: createMockFindCategory({ user: { _id: "" } }),
    expected: new Error("User ID is required"),
  },
];
