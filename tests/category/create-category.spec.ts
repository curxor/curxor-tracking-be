// // const {
// //   createCategoryDto,
// // } = require("./../../src/dtos/category/create-category.dto");
// // const {
// //   createCategorySchema,
// // } = require("./../../src/validates/category.validate");
// // const { createCategoryTestCase } = require("./../../src/mocks/category.mock");
// // describe("Unit Test - addCategory", () => {
// //   createCategorySchema.forEach(({ title, input, expected }) => {
// //     it(title, async () => {
// //       try {
// //         // Nếu không lỗi, gọi hàm tạo ví
// //         const result = await createCategoryDto(input);

// //         // Nếu test kỳ vọng thất bại mà không lỗi -> sai
// //         if (!expected.success) {
// //           fail(`Expected error but got success: ${JSON.stringify(result)}`);
// //         }

// //         expect(result).toHaveProperty("symbol");
// //         expect(result).toHaveProperty("name");
// //         expect(result).toHaveProperty("parent_id");
// //         expect(result).toHaveProperty("createdBy");
// //         expect(result).toHaveProperty("transaction_type");
// //       } catch (error) {
// //         // Kiểm tra lỗi có giống kỳ vọng không
// //         if (expected.success) {
// //           fail(`Expected success but got error: ${error.message}`);
// //         } else {
// //           expect(error.message).toContain(expected.error);
// //         }
// //       }
// //     });
// //   });
// // });
// import { createCategoryTestCase } from "../../src/mocks/category.mock";
// import CategoryService from "../../src/services/category.service";

// type CreateCategoryTestCase = {
//   title: string;
//   input: any;
//   expected: {
//     success: boolean;
//     error?: string;
//   };
// };

// describe("Create Category", () => {
//   createCategoryTestCase.forEach(
//     ({ title, input, expected }: CreateCategoryTestCase) => {
//       test(
//         title,
//         async () => {
//           try {
//             const result = await CategoryService.createCategory(input);
//             if (expected.success) {
//               expect(result).toBeTruthy();
//             } else {
//               throw new Error(
//                 `Expected failure but got success: ${JSON.stringify(result)}`
//               );
//             }
//           } catch (error) {
//             if (expected.success) {
//               fail(
//                 `Expected success but got error: ${(error as Error).message}`
//               );
//             } else {
//               expect((error as Error).message).toContain(expected.error);
//             }
//           }
//         },
//         15000
//       );
//     }
//   );
// });

// const createCategoryTestCases: CreateCategoryTestCase[] = [
//   {
//     title: "✅ Tạo danh mục không có symbol",
//     input: { ...validCategoryData, icon: undefined },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: Thiếu name",
//     input: { ...validCategoryData, name: undefined },
//     expected: { success: false, error: "name is required" },
//   },
//   {
//     title: "❌ Lỗi: name quá ngắn (< 3 ký tự)",
//     input: { ...validCategoryData, name: "ab" },
//     expected: { success: false, error: "name must be at least 3 characters" },
//   },
//   {
//     title: "✅ Tạo danh mục với name có độ dài 3 ký tự",
//     input: { ...validCategoryData, name: "abc" },
//     expected: { success: true },
//   },
//   {
//     title: "❌ Lỗi: name quá dài (> 50 ký tự)",
//     input: { ...validCategoryData, name: "a".repeat(51) },
//     expected: { success: false, error: "name must be at most 50 characters" },
//   },
// ];
//#region version 2
// import CategoryService from "../../src/services/category.service";
// import { validCategoryData } from "../../src/mocks/category.mock";
// import { categoryTestCases } from "../../src/mocks/category.mock";
// interface CreateCategoryTestCase {
//   title: string;
//   input: Partial<typeof validCategoryData>; // ✅ Cho phép input không cần đủ dữ liệu
//   expected: { success: boolean; error?: string };
// }
// describe("Create Category", () => {
//   categoryTestCases.forEach(({ title, input, expected }) => {
//     it(
//       title,
//       async () => {
//         try {
//           // Nếu không lỗi
//           const result = await CategoryService.createCategory(input);
//           // Nếu test kỳ vọng thất bại mà không lỗi -> sai
//           if (!expected.success) {
//             throw new Error(
//               `Expected error but got success: ${JSON.stringify(result)}`
//             );
//           }

//           expect(result).toHaveProperty("symbol");
//           expect(result).toHaveProperty("name");
//           expect(result).toHaveProperty("parent_id");
//           expect(result).toHaveProperty("createdBy");
//           expect(result).toHaveProperty("transaction_type");
//         } catch (error) {
//           // Kiểm tra lỗi có giống kỳ vọng không
//           // if (expected.success) {
//           //   throw new Error(`Expected success but got error: ${error.message}`);
//           // } else {
//           //   expect(error.message).toContain(expected.error);
//           // }
//           console.log(error);
//         }
//       },
//       15000
//     );
//   });
// });
//#endregion
//#region version 3
// import CategoryService from "../../src/services/category.service";
// import { categoryTestCases, createMockCategory } from "../../src/mocks/category.mock";
// import { Types } from "mongoose";

// describe("Tạo danh mục", () => {
//   let mockCreateCategory: jest.SpyInstance;

//   beforeEach(() => {
//     mockCreateCategory = jest.spyOn(CategoryService, "createCategory");
//   });

//   afterEach(() => {
//     jest.clearAllMocks(); // Xóa các mock sau mỗi test case
//   });

//   categoryTestCases.forEach(({ title, input, expected }) => {
//     it(title, async () => {
//       // Arrange
//       if (expected instanceof Error) {
//         mockCreateCategory.mockRejectedValue(expected);
//       } else {
//         mockCreateCategory.mockResolvedValue(expected);
//       }

//       // Act + Assert
//       if (expected instanceof Error) {
//         await expect(CategoryService.createCategory(input)).rejects.toThrow(expected.message);
//       } else {
//         const result = await CategoryService.createCategory(input);
//         expect(result).toEqual(expected);
//       }

//       expect(mockCreateCategory).toHaveBeenCalledWith(input);
//       expect(mockCreateCategory).toHaveBeenCalledTimes(1);
//     });
//   });

//   it("❌ Lỗi: Dịch vụ tạo danh mục gặp lỗi không mong muốn", async () => {
//     mockCreateCategory.mockRejectedValue(new Error("Lỗi không mong muốn"));

//     const invalidData = createMockCategory({
//       name: "",
//       description: "",
//       icon: "",
//       type: "",
//     });

//     await expect(CategoryService.createCategory(invalidData)).rejects.toThrow(
//       "Lỗi không mong muốn"
//     );

//     expect(mockCreateCategory).toHaveBeenCalledTimes(1);
//   });
// });
//#endregion
//#region version 4
// import { createCategorySchema } from '../validations/category.validation';
// import { createMockCategory } from '../mocks/category.mock';
// import { VALIDATION_MESSAGE } from '../constants/validation-messages';
import { VALIDATION_MESSAGE } from "../../src/constants/validation-messages";
import { createCategorySchema } from "../../src/validates/category.validate";
import { createMockCategory } from "../../src/mocks/create-category.mock";
describe("Tạo danh mục", () => {
  it("✅ Tạo danh mục thành công", async () => {
    const validData = createMockCategory();
    await expect(
      createCategorySchema.validate(validData)
    ).resolves.toBeTruthy();
  });

  test.each([
    [
      "thiếu trường name",
      createMockCategory({ name: "" }),
      VALIDATION_MESSAGE.REQUIRED_NAME,
    ],
    [
      "thiếu trường description",
      createMockCategory({ description: "" }),
      VALIDATION_MESSAGE.REQUIRED_DESCRIPTION,
    ],
    [
      "thiếu trường icon",
      createMockCategory({ icon: "" }),
      VALIDATION_MESSAGE.REQUIRED_ICON,
    ],
    [
      "thiếu trường type",
      createMockCategory({ type: "" }),
      VALIDATION_MESSAGE.REQUIRED_TYPE,
    ],
    [
      "số lượng ký tự name nhỏ hơn 3",
      createMockCategory({ name: "ab" }),
      VALIDATION_MESSAGE.NAME_TOO_SHORT,
    ],
    [
      "số lượng ký tự name lớn hơn 50",
      createMockCategory({ name: "a".repeat(52) }),
      VALIDATION_MESSAGE.NAME_TOO_LONG,
    ],
  ])("❌ Lỗi khi %s", async (_, input, expectedError) => {
    await expect(createCategorySchema.validate(input)).rejects.toThrow(
      expectedError
    );
  });
});

//#endregion
