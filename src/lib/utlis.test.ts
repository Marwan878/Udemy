import { specialRound } from "./utils";

describe("specialRound", () => {
  it("should return the number itself when it's an integer", () => {
    expect(specialRound(5)).toBe(5);
  });
  it("should return the integer part when decimal part is less than 0.3", () => {
    expect(specialRound(4.2)).toBe(4);
    expect(specialRound(4.1)).toBe(4);
    expect(specialRound(3.2)).toBe(3);
    expect(specialRound(3.1)).toBe(3);
  });
  it("should round to half if the when decimal part is greater than or equal 0.3", () => {
    expect(specialRound(4.3)).toBe(4.5);
    expect(specialRound(3.3)).toBe(3.5);
    expect(specialRound(4.3)).toBe(4.5);
    expect(specialRound(4.5)).toBe(4.5);
    expect(specialRound(4.7)).toBe(4.5);
    expect(specialRound(4.8)).toBe(5);
    expect(specialRound(3.9)).toBe(4);
    expect(specialRound(3.5)).toBe(3.5);
    expect(specialRound(3.7)).toBe(3.5);
    expect(specialRound(3.3)).toBe(3.5);
    expect(specialRound(3.8)).toBe(4);
    expect(specialRound(4.8)).toBe(5);
  });
});
