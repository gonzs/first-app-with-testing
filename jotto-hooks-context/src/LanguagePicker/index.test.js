import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import LanguagePicker from "./";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("should renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});

test("should does throw warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test("should renders non-zero language icons", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "language-icon");
  expect(component.length).toBeGreaterThan(0);
});

test("calls setLanguage prop upon click", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "language-icon");
  const firstIcon = component.first();
  firstIcon.simulate("click");
  expect(mockSetLanguage).toHaveBeenCalled();
});
