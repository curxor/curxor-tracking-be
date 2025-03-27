//#region version 01
// import { findCategorySchema } from "../../src/validates/category.validate";
// describe("Tìm kiếm danh mục", () => {
//   it("✔️ Tìm danh mục thành công", async () => {
//     const input = {
//       _id: "65e4e2725630ccda6e4de083",
//       user: {
//         _id: "67e4e2725630ccda6e4de083",
//       },
//     };

//     await expect(findCategorySchema.validate(input)).resolves.toBeTruthy();
//   });

//   it("❌ Lỗi khi thiếu trường _id", async () => {
//     const input = {
//       user: {
//         _id: "67e4e2725630ccda6e4de083",
//       },
//     };

//     await expect(findCategorySchema.validate(input)).rejects.toThrow(
//       "ID is required"
//     );
//   });

//   it("❌ Lỗi khi thiếu user ID", async () => {
//     const input = {
//       _id: "65e4e2725630ccda6e4de083",
//       user: {},
//     };

//     await expect(findCategorySchema.validate(input)).rejects.toThrow(
//       "User ID is required"
//     );
//   });
// });
//#endregion
//#region version 02
import { findCategorySchema } from "../../src/validates/category.validate";
import { createMockFindCategory } from "../../src/mocks/find-category.mock";
import { VALIDATION_MESSAGE } from "../../src/constants/validation-messages";

describe("Tìm kiếm danh mục", () => {
  it("✅ Tìm kiếm danh mục thành công", async () => {
    const validData = createMockFindCategory();
    await expect(findCategorySchema.validate(validData)).resolves.toBeTruthy();
  });

  test.each([
    [
      "thiếu ID",
      createMockFindCategory({ _id: "" }),
      VALIDATION_MESSAGE.REQUIRED_ID,
    ],
    [
      "thiếu user ID",
      createMockFindCategory({ user: { _id: "" } }),
      VALIDATION_MESSAGE.REQUIRED_USER_ID,
    ],
  ])("❌ Lỗi khi %s", async (_, input, expectedError) => {
    await expect(findCategorySchema.validate(input)).rejects.toThrow(
      expectedError
    );
  });
});
//#endregion
