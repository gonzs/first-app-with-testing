import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import SecretWordReveal from "./";

const defaultProps = {
  secretWord: "party",
  gaveup: true,
};

/**
 * Factory function to create ShallowWrapper for the SecreWordReveal component
 * @function setup
 * @param {object} props
 * @return {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<SecretWordReveal {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "secretword-reveal-component");
  expect(component.length).toBe(1);
});

test("show secretword if gaveup is true", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "reveal-msg");
  expect(component.text()).toContain("party");
});

test("no show secretword if gaveup is true", () => {
  const wrapper = setup({ gaveup: false });
  const component = findByTestAttr(wrapper, "reveal-msg");
  expect(component.length).toBe(0);
});

test("does not throw with expected props", () => {
  const expectedProps = { secretWord: "party", gaveup: false };
  checkProps(SecretWordReveal, expectedProps);
});
