import React from "react";
import { mount } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import Input from "./";
import LanguageContext from "../Context/languageContext";

const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "train";

  return mount(
    <LanguageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </LanguageContext.Provider>
  );
};

test("renders without error ", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "input-component");
  expect(component.length).toBe(1);
});

test("Check PropsTypes ", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("State controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("state updates with empty value upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
  });

  test("should correctly renders submit string in english", () => {
    wrapper = setup({ language: "en" });
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    expect(submitBtn.text()).toBe("Submit");
  });

  test("should correctly renders congrats submit in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    expect(submitBtn.text()).toBe("🚀");
  });
});
