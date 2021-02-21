import React from "react";
import { shallow, mount } from "enzyme";

import guessedWordsContext from "./guessedWordsContext";

function FunctionalComponent() {
  guessedWordsContext.useGuessedWords();
  return <div />;
}

test("should useGuessedWords throws error when not wrapped in GuessedWordsProvider", () => {
  expect(() => shallow(<FunctionalComponent />)).toThrow(
    "useGuessedWords must be used within a GuessedWordsProvider"
  );
});

test("should useGuessedWords does not throw error when wrapped in GuessedWordsProvider", () => {
  expect(() =>
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  ).not.toThrow("useGuessedWords must be used within a GuessedWordsProvider");
});
