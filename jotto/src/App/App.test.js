import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import App, { UnconnectedApp } from "./";

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @return {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("redux props", () => {
  test("has access to `success` state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("has access to `secretWord` state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test("has access to `gaveup` state", () => {
    const gaveup = true;
    const wrapper = setup({ gaveup });
    const gaveupProp = wrapper.instance().props.gaveup;
    expect(gaveupProp).toBe(gaveup);
  });
  test("has access to `guessedWords` state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("has access to `customSecretWord` state", () => {
    const customSecretWord = "none";
    const wrapper = setup({ customSecretWord });
    const customSecretWordProp = wrapper.instance().props.customSecretWord;
    expect(customSecretWordProp).toBe(customSecretWord);
  });
  test("has access to `serverError` state", () => {
    const serverError = false;
    const wrapper = setup({ serverError });
    const serverErrorProp = wrapper.instance().props.serverError;
    expect(serverErrorProp).toBe(serverError);
  });
  test("`getSecretWord` action creator is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });

  test("`getSecretWord` runs on App mount", () => {
    const getSecretWordMock = jest.fn();

    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [],
      gaveup: false,
      customSecretWord: "none",
    };

    // Set up App component with getSecretWordMock as the getSecretWord prop
    const wrapper = shallow(<UnconnectedApp {...props} />);

    // Run lifecycle method
    wrapper.instance().componentDidMount();

    // Check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
  });
});

describe("render", () => {
  test("render app component", () => {
    const wrapper = setup({ serverError: false });
    const component = findByTestAttr(wrapper, "app-component");
    expect(component.length).toBe(1);
  });

  test("no render app component", () => {
    const wrapper = setup({ serverError: true });
    const component = findByTestAttr(wrapper, "app-component");
    expect(component.length).toBe(0);
  });

  test("no render serverError component", () => {
    const wrapper = setup({ serverError: false });
    const component = findByTestAttr(wrapper, "error-component");
    expect(component.length).toBe(0);
  });

  test("render serverError component", () => {
    const wrapper = setup({ serverError: true });
    const component = findByTestAttr(wrapper, "error-component");
    expect(component.length).toBe(1);
  });
});
