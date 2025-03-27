import { VALIDATION_MESSAGE } from "../../src/constants/validation-messages";
import { deleteCategoryDto } from "../../src/dtos/category/delete-category.dto";
import CategoryService from "../../src/services/category.service";
import { createMockDeleteCategory } from "../../src/mocks/delete-category.mock";

describe("Xóa danh mục", () => {
  let deleteCategorySpy: jest.SpyInstance;

  beforeEach(() => {
    deleteCategorySpy = jest
      .spyOn(CategoryService, "deleteCategory")
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("✅ Xóa danh mục thành công", async () => {
    const validData = createMockDeleteCategory();
    await expect(
      CategoryService.deleteCategory(validData)
    ).resolves.toBeUndefined();
    expect(deleteCategorySpy).toHaveBeenCalledWith(validData);
  });

  test.each([
    [
      "thiếu ID",
      createMockDeleteCategory({ _id: "" }),
      VALIDATION_MESSAGE.REQUIRED_ID,
    ],
    // [
    //   "thiếu user ID",
    //   createMockDeleteCategory({ user: { _id: "" } }),
    //   VALIDATION_MESSAGE.REQUIRED_USER_ID,
    // ],
  ])("❌ Lỗi khi %s", async (_, input, expectedError) => {
    deleteCategorySpy.mockRejectedValue(new Error(expectedError));
    await expect(CategoryService.deleteCategory(input)).rejects.toThrow(
      expectedError
    );
  });
});
