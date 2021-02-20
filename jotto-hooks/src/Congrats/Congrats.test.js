import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import Congrats from "./";
import LanguageContext from "../Context/languageContext";

/**
 *  Factory function to create ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} testValues
 * @returns {ShallowWrapper}
 */
const setup = ({ success, language }) => {
  success = success || false;
  language = language || "en";

  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when success prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when success prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("does not throw with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});

describe("languagePicker", () => {
  test("should correctly renders congrats string in english", () => {
    const props = { success: true };
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, "component-congrats");

    expect(component.text()).toBe("Congratulations! You guessed the word");
  });

  test("should correctly renders congrats string in emoji", () => {
    const props = { success: true, language: "emoji" };
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, "component-congrats");

    expect(component.text()).toBe("🎯🎉");
  });
});
