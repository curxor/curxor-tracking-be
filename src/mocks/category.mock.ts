import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import { createCategoryDto } from "../dtos/category/create-category.dto";

export const mockUser: IUser = {
  _id: new Types.ObjectId(),
  name: "Bao Ngoc",
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
  // {
  //   name: "Education",
  //   description: "Courses and books",
  //   icon: "📚",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Travel",
  //   description: "Travel expenses",
  //   icon: "✈️",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Shopping",
  //   description: "Buying stuff",
  //   icon: "🛒",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Insurance",
  //   description: "Health and life insurance",
  //   icon: "🛡️",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Gifts",
  //   description: "Gifts for others",
  //   icon: "🎁",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Subscriptions",
  //   description: "Monthly subscriptions",
  //   icon: "💳",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Home",
  //   description: "Home expenses",
  //   icon: "🏠",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Pets",
  //   description: "Pet care",
  //   icon: "🐶",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Utilities",
  //   description: "Electricity and water",
  //   icon: "⚡",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Clothing",
  //   description: "Clothes and accessories",
  //   icon: "👗",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Investments",
  //   description: "Stock and bonds",
  //   icon: "📈",
  //   type: "expense",
  //   user: mockUser,
  // },
  // {
  //   name: "Childcare",
  //   description: "Expenses for children",
  //   icon: "👶",
  //   type: "expense",
  //   user: mockUser,
  // },
];
