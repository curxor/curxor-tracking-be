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
import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import { createCategoryDto } from "../dtos/category/create-category.dto";
import { title } from "process";
import { validateLocaleAndSetLanguage } from "typescript";

export const mockUser: IUser = {
  _id: new Types.ObjectId(),
  name: "BaoNgoc",
  email: "ngoc@example.com",
  avatar: "https://example.com/avatar.png",
  balance: 1000,
};

export const mockCategory: createCategoryDto = {
  name: "Food",
  description: "Monthly food budget",
  icon: "🍕🍕",
  type: "expense",
  user: mockUser,
};

export const mockCategoryId = new Types.ObjectId();

export const mockCategories: createCategoryDto[] = [
  {
    name: "Food",
    description: "Monthly food budget",
    icon: "🍕",
    type: "expense",
    user: mockUser,
  },
  {
    name: "Transport",
    description: "Daily transport",
    icon: "🚗",
    type: "expense",
    user: mockUser,
  },
  {
    name: "Entertainment",
    description: "Movies and music",
    icon: "🎬",
    type: "expense",
    user: mockUser,
  },
];

export const validCategoryData = {
  user: mockUser,
  description: "Monthly food budget", // tối đa 200 ký tự
  name: "Food", // 3 - 50 ký tự
  icon: "a.png",
  type: "expense",
};

//#region Test Case createCategory
export const categoryTestCases = [
  {
    title: "✅ Tạo danh mục không có icon",
    input: { ...validCategoryData, icon: "" },
    expected: { success: true },
  },
  {
    title: "❌ Lỗi: Thiếu name",
    input: { ...validCategoryData, name: "" },
    expected: {
      success: false,
      error: "Category validation failed: name: Path `name` is required",
    },
  },
  {
    title: "❌ Lỗi: name quá ngắn (< 3 ký tự)",
    input: { ...validCategoryData, name: "Ă" }, // 1 ký tự
    expected: { success: false, error: "Name must be at least 3 characters" },
  },
  {
    title: "✅ Tạo danh mục với name có độ dài 3 ký tự",
    input: { ...validCategoryData, name: "abc" },
    expected: { success: true },
  },
  {
    title: "❌ Lỗi: name quá dài (> 50 ký tự)",
    input: { ...validCategoryData, name: "A".repeat(51) },
    expected: { success: false, error: "Name must be less than 50 characters" },
  },
];
//#endregion
//#region Test Case updateCategory
expect const 
//#endregion