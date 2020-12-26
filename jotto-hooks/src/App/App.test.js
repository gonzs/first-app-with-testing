import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "./";
import HookActions from "../Actions/HookActions";

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  HookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);

  React.useReducer = mockUseReducer;

  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup("party");
  const component = findByTestAttr(wrapper, "app-component");

  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("should call getSecretWord on App mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("should secretWord does not update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });

  test("should renders App when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "app-component");
    expect(appComponent.exists()).toBe(true);
  });

  test("should does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner-component");
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test("should does not render App when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "app-component");
    expect(appComponent.exists()).toBe(false);
  });

  test("should renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner-component");
    expect(spinnerComponent.exists()).toBe(true);
  });
});
