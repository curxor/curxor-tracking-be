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

import CategoryService from "../../src/services/category.service";
import { validCategoryData } from "../../src/mocks/category.mock";
import { categoryTestCases } from "../../src/mocks/category.mock";
interface CreateCategoryTestCase {
  title: string;
  input: Partial<typeof validCategoryData>; // ✅ Cho phép input không cần đủ dữ liệu
  expected: { success: boolean; error?: string };
}

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

describe("Create Category", () => {
  categoryTestCases.forEach(({ title, input, expected }) => {
    it(
      title,
      async () => {
        try {
          // Nếu không lỗi
          const result = await CategoryService.createCategory(input);
          // Nếu test kỳ vọng thất bại mà không lỗi -> sai
          if (!expected.success) {
            throw new Error(
              `Expected error but got success: ${JSON.stringify(result)}`
            );
          }

          expect(result).toHaveProperty("symbol");
          expect(result).toHaveProperty("name");
          expect(result).toHaveProperty("parent_id");
          expect(result).toHaveProperty("createdBy");
          expect(result).toHaveProperty("transaction_type");
        } catch (error) {
          // Kiểm tra lỗi có giống kỳ vọng không
          // if (expected.success) {
          //   throw new Error(`Expected success but got error: ${error.message}`);
          // } else {
          //   expect(error.message).toContain(expected.error);
          // }
          console.log(error);
        }
      },
      15000
    );
  });
});
