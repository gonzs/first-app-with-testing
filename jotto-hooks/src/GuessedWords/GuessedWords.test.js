import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import GuessedWords from "./";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
  customSecretWord: "none",
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there are no words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test("renders instructions to guess a word", () => {
    const component = findByTestAttr(wrapper, "component-instructions");
    expect(component.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 4 },
    { guessedWord: "task", letterMatchCount: 1 },
    { guessedWord: "run", letterMatchCount: 2 },
  ];

  beforeEach(() => {
    wrapper = setup({
      guessedWords,
    });
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test("renders guessed words section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });

  test("correct numbers of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});

describe("if there is custom secret word input", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      customSecretWord: "in progress",
    });
  });

  test("no renders ", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(0);
  });
});

describe("languagePicker", () => {
  test("should renders correctly guess instructions string in english by default", () => {
    const wrapper = setup({ guessedWords: [] });
    const guessInstructions = findByTestAttr(wrapper, "component-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });

  test("should renders correctly guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setup({ guessedWords: [] });
    const guessInstructions = findByTestAttr(wrapper, "component-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🆎");
  });
});
