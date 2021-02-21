import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import GuessedWords from "./";
import guessedWordsContext from "../Context/guessedWordsContext";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {array} guessedWords
 * @return {ShallowWrapper}
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup([]);
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
    wrapper = setup(guessedWords);
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

describe("languagePicker", () => {
  test("should renders correctly guess instructions string in english by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "component-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });

  test("should renders correctly guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "component-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🆎");
  });
});
