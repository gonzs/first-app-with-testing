import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 *  Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props
 * @param {any} state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given attr-test value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper
 * @param {string} value
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[attr-test="${value}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComp = findByTestAttr(wrapper, "component-app");
  expect(appComp.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "display-counter");
  expect(counterDisplay.length).toBe(1);
});

test("Counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

describe("Increment", () => {
  test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "increment-button");

    expect(button.length).toBe(1);
  });

  test("clicking button increments counter display", () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    const button = findByTestAttr(wrapper, "increment-button");
    button.simulate("click");
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, "display-counter");

    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe("Decrement", () => {
  test("renders decrement button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "decrement-button");

    expect(button.length).toBe(1);
  });

  test("clicking button decrements counter display", () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, "display-counter");

    expect(counterDisplay.text()).toContain(counter - 1);
  });
});

test("error message does not show when not needed", () => {
  const wrapper = setup();
  const message = findByTestAttr(wrapper, "error-msg");

  expect(message.exists()).toBeFalsy();
});

describe("Counter is 0", () => {
  let counter;
  let wrapper;
  let counterDisplay;

  beforeEach(() => {
    counter = 0;
    wrapper = setup(null, { counter });
    counterDisplay = findByTestAttr(wrapper, "display-counter");
  });

  test("Clicking decrement button", () => {
    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
    wrapper.update();
    const message = findByTestAttr(wrapper, "error-msg");

    expect(wrapper.state().counter).toBeGreaterThanOrEqual(0);
    expect(counterDisplay.text()).toContain(counter);
    expect(message.length).toBe(1);
  });

  test("Clicking increment button", () => {
    const message = findByTestAttr(wrapper, "error-msg");
    const button = findByTestAttr(wrapper, "increment-button");
    button.simulate("click");
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, "display-counter");

    expect(counterDisplay.text()).toContain(counter + 1);
    expect(message.exists()).toBeFalsy();
  });
});
