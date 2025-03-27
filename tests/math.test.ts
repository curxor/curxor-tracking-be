import { sum } from "../src/math";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1 + 2 to not equal 5", () => {
  expect(sum(1, 2)).not.toBe(5); // ✅ Đúng logic
});
