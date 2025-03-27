//#region
// import { Types } from "mongoose";
// import { IUser } from "../models/user.model";
// import { createCategoryDto } from "../dtos/category/create-category.dto";
// import { title } from "process";
// import { validateLocaleAndSetLanguage } from "typescript";

// export const mockUser: IUser = {
//   _id: new Types.ObjectId(),
//   name: "Bao Ngoc",
//   email: "ngoc@example.com",
//   avatar: "https://example.com/avatar.png",
//   balance: 1000,
// };

// export const mockCategory: createCategoryDto = {
//   name: "Food",
//   description: "Monthly food budget",
//   icon: "🍕🍕",
//   type: "expense",
//   user: mockUser,
// };

// export const mockCategoryId = new Types.ObjectId();

// export const mockCategories: createCategoryDto[] = [
//   {
//     name: "Food",
//     description: "Monthly food budget",
//     icon: "🍕",
//     type: "expense",
//     user: mockUser,
//   },
//   {
//     name: "Transport",
//     description: "Daily transport",
//     icon: "🚗",
//     type: "expense",
//     user: mockUser,
//   },
//   {
//     name: "Entertainment",
//     description: "Movies and music",
//     icon: "🎬",
//     type: "expense",
//     user: mockUser,
//   },
//   // {
//   //   name: "Education",
//   //   description: "Courses and books",
//   //   icon: "📚",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Travel",
//   //   description: "Travel expenses",
//   //   icon: "✈️",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Shopping",
//   //   description: "Buying stuff",
//   //   icon: "🛒",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Insurance",
//   //   description: "Health and life insurance",
//   //   icon: "🛡️",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Gifts",
//   //   description: "Gifts for others",
//   //   icon: "🎁",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Subscriptions",
//   //   description: "Monthly subscriptions",
//   //   icon: "💳",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Home",
//   //   description: "Home expenses",
//   //   icon: "🏠",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Pets",
//   //   description: "Pet care",
//   //   icon: "🐶",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Utilities",
//   //   description: "Electricity and water",
//   //   icon: "⚡",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Clothing",
//   //   description: "Clothes and accessories",
//   //   icon: "👗",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Investments",
//   //   description: "Stock and bonds",
//   //   icon: "📈",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
//   // {
//   //   name: "Childcare",
//   //   description: "Expenses for children",
//   //   icon: "👶",
//   //   type: "expense",
//   //   user: mockUser,
//   // },
// ];
// export const validCategoryData = {
//   name: "Food", // 3 - 50 ký tự
//   description: "Monthly food budget", // tối đa 200 ký tự
//   icon: "🍕",
//   type: "expense",
//   user: mockUser,
// };

// export const createCategoryTestCase = [
//   {
//     title: "✅ Tạo danh mục không có symbol",
//     input: { ...validCategoryData, symbol: undefined },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: Thiếu name",
//     input: { ...validCategoryData, name: undefined },
//     expected: {
//       success: false,
//       error: "Category validation failed: name: Path `name` is required",
//     },
//   },
//   {
//     title: "❌ Lỗi: name quá ngắn (< 3 ký tự)",
//     input: { ...validCategoryData, name: "Ă" }, // 1 ký tự
//     expected: { success: false, error: "Name must be at least 3 characters" },
//   },
//   {
//     title: "✅ Tạo danh mục với name có độ dài 3 ký tự",
//     input: { ...validCategoryData, name: "abc" },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: name quá dài (> 50 ký tự)",
//     input: { ...validCategoryData, name: "A".repeat(51) },
//     expected: { success: false, error: "Name must be less than 50 characters" },
//   },
// ];
//#region New
// import { Types } from "mongoose";
// import { IUser } from "../models/user.model";
// import { createCategoryDto } from "../dtos/category/create-category.dto";
// import { title } from "process";
// import { validateLocaleAndSetLanguage } from "typescript";
// import { editCategoryDto } from "../dtos/category/edit-category.dto";
// //#region mockUser
// export const mockUser: IUser = {
//   _id: new Types.ObjectId(),
//   name: "BaoNgoc",
//   email: "ngoc@example.com",
//   avatar: "https://example.com/avatar.png",
//   balance: 1000,
// };
//#endregion
//#endregion
// export const mockCategory: createCategoryDto = {
//   name: "Food",
//   description: "Monthly food budget",
//   icon: "🍕🍕",
//   type: "expense",
//   user: mockUser,
// };

// export const mockCategoryId = new Types.ObjectId();

// export const mockCategories: createCategoryDto[] = [
//   {
//     name: "Food",
//     description: "Monthly food budget",
//     icon: "🍕",
//     type: "expense",
//     user: mockUser,
//   },
//   {
//     name: "Transport",
//     description: "Daily transport",
//     icon: "🚗",
//     type: "expense",
//     user: mockUser,
//   },
//   {
//     name: "Entertainment",
//     description: "Movies and music",
//     icon: "🎬",
//     type: "expense",
//     user: mockUser,
//   },
// ];
//#region mockCategory: createCategoryDto
//#region New
// export const validCategoryData = {
//   user: mockUser,
//   description: "Monthly food budget", // tối đa 200 ký tự
//   name: "Food", // 3 - 50 ký tự
//   icon: "a.png",
//   type: "expense",
// };

// export const categoryTestCases = [
//   {
//     title: "✅ Tạo danh mục không có icon",
//     input: { ...validCategoryData, icon: "" },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: Thiếu name",
//     input: { ...validCategoryData, name: "" },
//     expected: {
//       success: false,
//       error: "Category validation failed: name: Path `name` is required",
//     },
//   },
//   {
//     title: "❌ Lỗi: name quá ngắn (< 3 ký tự)",
//     input: { ...validCategoryData, name: "Ă" }, // 1 ký tự
//     expected: { success: false, error: "Name must be at least 3 characters" },
//   },
//   {
//     title: "✅ Tạo danh mục với name có độ dài 3 ký tự",
//     input: { ...validCategoryData, name: "abc" },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: name quá dài (> 50 ký tự)",
//     input: { ...validCategoryData, name: "A".repeat(51) },
//     expected: { success: false, error: "Name must be less than 50 characters" },
//   },
// ];
//#endregion
//#endregion
//#region Test Case findCategory
//#region New
// const invalidId = "123"; // ❌ Không phải là chuỗi hex 24 ký tự
// export const unmatchedUser = {
//   _id: new Types.ObjectId().toString(), // User ID khác
// };

// export const validFindCategoryData = {
//   _id: new Types.ObjectId().toString(),
//   user: mockUser,
//   name: "Test Category",
//   description: "Test Description",
//   icon: "test-icon",
//   amount: 500,
//   type: "expense",
// };
// export const findCategoryTestCases = [
//   {
//     title: "✅ Tìm danh mục thành công",
//     input: validFindCategoryData,
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: Thiếu ID",
//     input: { _id: "", user: mockUser },
//     expected: {
//       error:
//         "input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
//     },
//   },

//   {
//     title: "❌ Lỗi: ID không hợp lệ",
//     input: { _id: invalidId, user: mockUser },
//     expected: { success: false, error: "Category not found" },
//   },
//   {
//     title: "❌ Lỗi: Không tìm thấy danh mục",
//     input: {
//       ...validFindCategoryData,
//       _id: new Types.ObjectId().toString(), // ID không tồn tại trong DB
//     },
//     expected: { success: false, error: "Category not found" },
//   },
//   {
//     title: "❌ Lỗi: Không khớp User ID",
//     input: {
//       ...validFindCategoryData,
//       user: unmatchedUser, // User không khớp{ _id: new Types.ObjectId().toString() }
//     },
//     expected: { success: false, error: "Category not found" },
//   },
// ];
//#endregion
//#endregion

//#region Test Case updateCategory
//#region New
// export const mockCategory = {
//   user: mockUser,
//   name: "Original Category",
//   description: "Original Description",
//   icon: "b.png",
//   amount: 1000,
//   type: "expense",
//   updateOne: jest.fn().mockResolvedValue(undefined),
// };
//#endregion
// Giả lập dữ liệu chỉnh sửa Category
// export const mockEditCategoryDto: editCategoryDto = {
//   _id: new Types.ObjectId(),
//   user: mockUser,
//   name: "Updated Category",
//   description: "Updated Description",
//   icon: "updated-icon",
//   amount: 500,
//   type: "income",
// };
//#endregion
//#endregion
//#region Version 02
import { Types } from "mongoose";
import { createCategoryDto } from "../dtos/category/create-category.dto";
import { IUser } from "../models/user.model";
export const createMockUser = (override?: Partial<IUser>): IUser => ({
  _id: new Types.ObjectId(),
  name: "Bao Ngoc",
  email: "ngoc@example.com",
  avatar: "https://example.com/avatar.png",
  balance: 1000,
  ...override,
});
export const createMockCategory = (
  override?: Partial<createCategoryDto>
): createCategoryDto => ({
  name: "Food",
  description: "Monthly food budget",
  icon: "🍕",
  type: "expense",
  user: createMockUser(),
  ...override,
});
export const validCategoryData = createMockCategory();

// export const mockCategoryId = new Types.ObjectId().toString();
export const categoryTestCases = [
  {
    title: "✅ Tạo danh mục thành công",
    input: createMockCategory({
      name: "Travel",
      description: "Travel International",
      icon: "sample-icon.png",
      type: "expense",
    }),
    expected: {
      id: "1",
      ...createMockCategory({
        name: "Travel",
        description: "Travel International",
        icon: "icon.png",
        type: "expense",
      }),
    },
  },
  {
    title: "❌ Lỗi khi thiếu trường name",
    input: createMockCategory({
      name: "",
      description: "Travel International",
      icon: "icon.png",
      type: "expense",
    }),
    expected: new Error("Dữ liệu danh mục không hợp lệ"),
  },
  {
    title: "❌ Lỗi khi số lượng ký tự name nhỏ hơn 3",
    input: createMockCategory({
      name: "Tr",
      description: "Travel International",
      icon: "icon.png",
      type: "",
    }),
    expected: new Error("Dữ liệu danh mục không hợp lệ"),
  },
  {
    title: "❌ Lỗi khi số lượng ký tự name lớn hơn 50",
    input: createMockCategory({
      name: "Tr".repeat(51),
      description: "Travel International",
      icon: "icon.png",
      type: "",
    }),
    expected: new Error("Dữ liệu danh mục không hợp lệ"),
  },
  {
    title: "❌ Lỗi khi thiếu trường description",
    input: createMockCategory({
      name: "Travel",
      description: "",
      icon: "icon.png",
      type: "expense",
    }),
    expected: new Error("Description is required"), // ✅ Thêm thông báo lỗi chính xác
  },
  {
    title: "❌ Lỗi khi thiếu trường icon",
    input: createMockCategory({
      name: "Travel",
      description: "Travel International",
      icon: "",
      type: "expense",
    }),
    expected: new Error("Dữ liệu danh mục không hợp lệ"),
  },
  {
    title: "❌ Lỗi khi thiếu trường type",
    input: createMockCategory({
      name: "Travel",
      description: "Travel International",
      icon: "icon.png",
      type: "", // ✅ Được chuyển thành undefined => Bị bắt lỗi "Type is required"
    }),
    expected: new Error("Type is required"),
  },
  
  {
    title: "❌ Lỗi khi số lượng ký tự description lớn hơn 200",
    input: createMockCategory({
      name: "a".repeat(250),
      description: "Travel International",
      icon: "icon.png",
      type: "",
    }),
    expected: new Error("Dữ liệu danh mục không hợp lệ"),
  },
];

//#endregion
