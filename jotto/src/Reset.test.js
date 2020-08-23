import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import Reset, { UnconnectedReset } from "./Reset";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Reset store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("successful guess", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });

    test("renders component withput error", () => {
      const component = findByTestAttr(wrapper, "component-reset");
      expect(component.length).toBe(1);
    });

    test("renders reset button without error", () => {
      const resetButton = findByTestAttr(wrapper, "reset-button");
      expect(resetButton.length).toBe(1);
    });
  });

  describe("non successful guess", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    test("renders component withput error", () => {
      const component = findByTestAttr(wrapper, "component-reset");
      expect(component.length).toBe(1);
    });

    test("do not render reset button withput error", () => {
      const resetButton = findByTestAttr(wrapper, "reset-button");
      expect(resetButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("resetGame action creator is a function prop", () => {
    const wrapper = setup();
    const resetGameProp = wrapper.instance().props.resetGame;
    expect(resetGameProp).toBeInstanceOf(Function);
  });
});

describe("`resetGame` action creator call", () => {
  let resetGameMock, wrapper;

  beforeEach(() => {
    resetGameMock = jest.fn();
    const props = {
      resetGame: resetGameMock,
      success: true,
    };

    wrapper = shallow(<UnconnectedReset {...props} />);

    const resetButton = findByTestAttr(wrapper, "reset-button");
    resetButton.simulate("click", { preventDefault() {} });
  });

  test("calls `resetGame` when reset button is clicked", () => {
    const resetGameCallCount = resetGameMock.mock.calls.length;
    expect(resetGameCallCount).toBe(1);
  });
});
