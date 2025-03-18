// src/__tests__/transaction.mock.ts
import { Types } from "mongoose";

export const mockUser = {
  _id: new Types.ObjectId("60d0fe4f5311236168a109ca"),
  email: "test@example.com",
  name: "Test User",
};

export const mockTransaction = {
  _id: new Types.ObjectId("60d0fe4f5311236168a109cb"),
  user: mockUser._id,
  amount: 1000,
  type: "income",
  description: "Salary",
  createdAt: new Date(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

export const generateMockTransactions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: new Types.ObjectId(),
    user: mockUser._id,
    amount: i * 100 + 1000,
    type: i % 2 === 0 ? "income" : "expense",
    description: `Transaction ${i + 1}`,
    createdAt: new Date(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  }));
};
