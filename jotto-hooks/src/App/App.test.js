import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "./";
import HookActions from "../Actions/HookActions";

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  HookActions.getSecretWord = mockGetSecretWord;

  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "app-component");

  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("should call getSecretWord on App mount", () => {
    const wrapper = setup();
    console.debug(wrapper);
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
});
