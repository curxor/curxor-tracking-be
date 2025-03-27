import CategoryService from "../../src/services/category.service";
import { IUser } from "../../src/models/user.model";
import { Category } from "../../src/models/category.model";
import { Types } from "mongoose";

describe("Lấy danh sách danh mục", () => {
  const mockUser: IUser = {
    _id: new Types.ObjectId(), // ObjectId dưới dạng string
    name: "Bao Ngoc",
    email: "ngoc@example.com",
    avatar: "https://example.com/avatar.png",
    balance: 1000,
  };

  const mockCategories = [
    {
      _id: "507f191e810c19729de860ea",
      name: "Food",
      description: "Monthly food budget",
      icon: "🍕",
      type: "expense",
      amount: 100,
      user: mockUser._id,
    },
    {
      _id: "507f191e810c19729de860eb",
      name: "Salary",
      description: "Monthly salary",
      icon: "💼",
      type: "income",
      amount: 5000,
      user: mockUser._id,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("✅ Trả về danh sách danh mục thành công", async () => {
    // Giả lập kết quả từ Category.find().lean().exec()
    jest.spyOn(Category, "find").mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockCategories),
      }),
    } as any);

    const result = await CategoryService.getCategories(mockUser);
    expect(result).toEqual(mockCategories);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Food");
  });

  it("✅ Trả về mảng rỗng khi không có danh mục nào", async () => {
    // Giả lập dữ liệu rỗng
    jest.spyOn(Category, "find").mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([]),
      }),
    } as any);

    const result = await CategoryService.getCategories(mockUser);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it("❌ Ném lỗi khi truy vấn thất bại", async () => {
    const errorMessage = "Database error";
    jest.spyOn(Category, "find").mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      }),
    } as any);

    await expect(CategoryService.getCategories(mockUser)).rejects.toThrow(
      errorMessage
    );
  });
});
