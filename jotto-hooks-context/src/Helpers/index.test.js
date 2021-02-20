import { getLetterMatchCount } from "./";

describe("getLetterMatchCount", () => {
  const secretWord = "party";
  test("returns correct count when there are no matching letters", () => {
    const letterMatchCount = getLetterMatchCount("bonus", secretWord);
    expect(letterMatchCount).toBe(0);
  });

  test("returns the correct count where there are 3 matching letters", () => {
    const letterMatchCount = getLetterMatchCount("rate", secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test("returns correct count when there are duplicate letters in the guess", () => {
    const letterMatchCount = getLetterMatchCount("parka", secretWord);
    expect(letterMatchCount).toBe(3);
  });
});
