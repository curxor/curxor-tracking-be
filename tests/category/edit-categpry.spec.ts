import { createCategorySchema } from "../../src/validates/category.validate";
import { createMockEditCategory } from "../../src/mocks/edit-category.mock";
import { VALIDATION_MESSAGE } from "../../src/constants/validation-messages";

describe("Chỉnh sửa danh mục", () => {
  it("✅ Chỉnh sửa danh mục thành công", async () => {
    const validData = createMockEditCategory();
    await expect(
      createCategorySchema.validate(validData)
    ).resolves.toBeTruthy();
  });

  test.each([
    // [
    //   "thiếu ID",
    //   createMockEditCategory({ _id: "" }),
    //   VALIDATION_MESSAGE.REQUIRED_ID,
    // ],
    [
      "thiếu tên danh mục",
      createMockEditCategory({ name: "" }),
      VALIDATION_MESSAGE.REQUIRED_NAME,
    ],
    [
      "tên danh mục nhỏ hơn 3 ký tự",
      createMockEditCategory({ name: "ab" }),
      VALIDATION_MESSAGE.NAME_TOO_SHORT,
    ],
    [
      "tên danh mục lớn hơn 50 ký tự",
      createMockEditCategory({ name: "a".repeat(51) }),
      VALIDATION_MESSAGE.NAME_TOO_LONG,
    ],
    [
      "thiếu description",
      createMockEditCategory({ description: "" }),
      VALIDATION_MESSAGE.REQUIRED_DESCRIPTION,
    ],
    [
      "thiếu icon",
      createMockEditCategory({ icon: "" }),
      VALIDATION_MESSAGE.REQUIRED_ICON,
    ],
    [
      "type không hợp lệ",
      createMockEditCategory({ type: "unknown" }),
      VALIDATION_MESSAGE.REQUIRED_TYPE,
    ],
  ])("❌ Lỗi khi %s", async (_, input, expectedError) => {
    await expect(createCategorySchema.validate(input)).rejects.toThrow(
      expectedError
    );
  });
});
