import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import { editCategoryDto } from "../dtos/category/edit-category.dto";

export const createMockUser = (override?: Partial<IUser>): IUser => ({
  _id: new Types.ObjectId(),
  name: "Bao Ngoc",
  email: "ngoc@example.com",
  avatar: "https://example.com/avatar.png",
  balance: 1000,
  ...override,
});

export const createMockEditCategory = (
  override?: Partial<editCategoryDto>
): editCategoryDto => ({
  _id: new Types.ObjectId().toString(),
  name: "Food",
  description: "Monthly food budget",
  icon: "🍕",
  type: "expense",
  amount: 100,
  user: createMockUser(),
  ...override,
});

export const validEditCategoryData = createMockEditCategory();

export const editCategoryTestCases = [
  {
    title: "✅ Chỉnh sửa danh mục thành công",
    input: createMockEditCategory(),
    expected: expect.objectContaining(validEditCategoryData),
  },
  {
    title: "❌ Lỗi khi thiếu ID",
    input: createMockEditCategory({ _id: "" }),
    expected: new Error("ID is required"),
  },
  {
    title: "❌ Lỗi khi thiếu tên danh mục",
    input: createMockEditCategory({ name: "" }),
    expected: new Error("Name is required"),
  },
  {
    title: "❌ Lỗi khi số ký tự của tên danh mục nhỏ hơn 3",
    input: createMockEditCategory({ name: "ab" }),
    expected: new Error("Name must be at least 3 characters"),
  },
  {
    title: "❌ Lỗi khi thiếu description",
    input: createMockEditCategory({ description: "" }),
    expected: new Error("Description is required"),
  },
  {
    title: "❌ Lỗi khi thiếu icon",
    input: createMockEditCategory({ icon: "" }),
    expected: new Error("Icon is required"),
  },
  {
    title: "❌ Lỗi khi type không hợp lệ",
    input: createMockEditCategory({ type: "unknown" }),
    expected: new Error("Invalid category type"),
  },
];
