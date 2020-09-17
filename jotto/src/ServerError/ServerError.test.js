import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import ServerError from ".";

/**
 *  Factory function to create ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<ServerError />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-server-error");
  expect(component.length).toBe(1);
});
