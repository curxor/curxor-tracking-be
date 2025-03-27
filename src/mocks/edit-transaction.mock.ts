// import { Types } from "mongoose";
// import { ITransaction } from "../interfaces/transaction";

// export const createMockTransaction = (
//   override?: Partial<ITransaction>
// ): ITransaction => ({
//   description: "Monthly food budget",
//   amount: 500,
//   category:  Types.ObjectId,
//   type: "expense",
//   user: new Types.ObjectId(),
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   ...override,
// });

// export const validTransactionData = createMockTransaction();

// export const transactionEditTestCases = [
//   {
//     title: "✅ Cập nhật giao dịch thành công",
//     input: createMockTransaction({
//       name: "Updated Food",
//       description: "Updated food budget",
//       amount: 600,
//     }),
//     expected: {
//       id: "1",
//       ...createMockTransaction({
//         name: "Updated Food",
//         description: "Updated food budget",
//         amount: 600,
//       }),
//     },
//   },
//   {
//     title: "❌ Lỗi khi thiếu transaction ID",
//     input: createMockTransaction({
//       _id: undefined,
//     }),
//     expected: new Error("Invalid transaction ID"),
//   },
//   {
//     title: "❌ Lỗi khi transaction không tồn tại",
//     input: createMockTransaction({
//       _id: new Types.ObjectId("660e11d60d1f7e66b44b7e1f"),
//     }),
//     expected: new Error("Transaction not found"),
//   },
// ];
