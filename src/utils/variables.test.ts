import { sum } from "./variables";

describe("add function", () => {
  test("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("adds negative numbers", () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});
