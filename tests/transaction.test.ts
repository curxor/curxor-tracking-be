import createHttpError from "http-errors";
import { Transaction } from "../src/models/transaction.model";
import TransactionService from "../src/services/transaction.service";
import TransactionRepository from "../src/repositories/transaction.repo";
import { convertToObjectId } from "../src/utils/objectId";
import { Types } from "mongoose";

// ✅ Sửa: Chuyển đổi ObjectId thành chuỗi hex
jest.mock("../src/models/transaction.model");
jest.mock("../src/repositories/transaction.repo");

describe("TransactionService", () => {
  const mockUser = {
    _id: new Types.ObjectId(),
    name: "Bao Ngoc",
    email: "ngoc@example.com",
    avatar: "https://example.com/avatar.png",
    balance: 1000,
  };

  const mockTransaction = {
    _id: new Types.ObjectId().toHexString(),
    description: "Test Transaction",
    amount: 1000,
    user: mockUser._id, // ✅ Chuyển thành chuỗi hex
    category: new Types.ObjectId().toHexString(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //#region getTransactionDetails
  it("Lấy thông tin chi tiết giao dịch", async () => {
    (Transaction.findOne as jest.Mock).mockResolvedValue(mockTransaction);

    const result = await TransactionService.getTransactionDetails(
      mockUser,
      mockTransaction._id
    );

    expect(Transaction.findOne).toHaveBeenCalledWith({
      user: mockUser._id,
      _id: convertToObjectId(mockTransaction._id), // ✅ Dùng convertToObjectId cho ObjectId
    });
    expect(result).toEqual(mockTransaction);
  });

  it("Thông báo lỗi khi không tìm thấy giao dịch", async () => {
    (Transaction.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      TransactionService.getTransactionDetails(mockUser, mockTransaction._id)
    ).rejects.toThrow(createHttpError(404, "Transaction not found"));
  });
  //#endregion

  //#region Cập nhật giao dịch
  it("Cập nhật giao dịch", async () => {
    (Transaction.findOne as jest.Mock).mockResolvedValue(mockTransaction);

    const updatedTransaction = {
      ...mockTransaction,
      amount: 2000,
    };

    await TransactionService.editTransaction(updatedTransaction, mockUser);

    expect(Transaction.findOne).toHaveBeenCalledWith({
      user: mockUser._id,
      _id: convertToObjectId(mockTransaction._id), // ✅ Chuyển thành ObjectId khi tìm kiếm
    });

    expect(mockTransaction.updateOne).toHaveBeenCalledWith(updatedTransaction);
  });
  //#endregion

  //#region Xóa giao dịch
  it("Xóa giao dịch", async () => {
    (Transaction.findOne as jest.Mock).mockResolvedValue(mockTransaction);

    await TransactionService.deleteTransaction(mockUser, mockTransaction._id);

    expect(Transaction.findOne).toHaveBeenCalledWith({
      user: mockUser._id,
      _id: convertToObjectId(mockTransaction._id), // ✅ Chuyển thành ObjectId khi xóa
    });

    expect(mockTransaction.deleteOne).toHaveBeenCalled();
  });

  it("Thông báo lỗi khi xóa không thành công", async () => {
    (Transaction.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      TransactionService.deleteTransaction(mockUser, mockTransaction._id)
    ).rejects.toThrow(createHttpError(404, "Transaction not found"));
  });
  //#endregion

  //#region Lấy danh sách giao dịch
  // it("Lấy danh sách giao dịch", async () => {
  //   const mockTransactions = [mockTransaction];
  //   (TransactionRepository.getTransactions as jest.Mock).mockResolvedValue(
  //     mockTransactions
  //   );
  //   (TransactionRepository.getTransactionCount as jest.Mock).mockResolvedValue(
  //     1
  //   );

  //   const result = await TransactionService.getTransactions({
  //     user: mockUser,
  //     limit: 10,
  //     page: 1,
  //     search: "",
  //   });

  //   expect(TransactionRepository.getTransactions).toHaveBeenCalledWith({
  //     user: mockUser,
  //     limit: 10,
  //     page: 1,
  //     search: "",
  //     query: { user: convertToObjectId(mockUser) }, // ✅ Chuyển thành ObjectId khi query
  //   });

  //   expect(TransactionRepository.getTransactionCount).toHaveBeenCalledWith({
  //     user: convertToObjectId(mockUser), // ✅ Chuyển thành ObjectId khi đếm
  //   });

  //   expect(result).toEqual({
  //     transactions: mockTransactions,
  //     pageCount: 1,
  //     total: 1,
  //   });
  // });
  //#endregion
});
