/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest", // Sử dụng ts-jest để chạy TypeScript
  testEnvironment: "node", // Môi trường test là Node.js
  roots: ["<rootDir>/tests"], // Đặt thư mục chứa test
  verbose: true, // ✅ Hiển thị chi tiết kết quả từng test
};
