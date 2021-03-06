import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import Input, { UnconnectedInput } from "./";

/**
 * Factory function to create a ShallowWrapper for the Input component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @return {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed and not given up", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: false,
        gaveup: false,
        customSecretWord: "none",
      };
      wrapper = setup(initialState);
    });

    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });

    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });

    test("renders giveup button", () => {
      const giveupButton = findByTestAttr(wrapper, "giveup-button");
      expect(giveupButton.length).toBe(1);
    });
  });

  describe("word has been guessed", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: true,
        gaveup: false,
        customSecretWord: "none",
      };
      wrapper = setup(initialState);
    });

    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("do not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });

    test("do not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });

    test("do not render giveup button", () => {
      const giveupButton = findByTestAttr(wrapper, "giveup-button");
      expect(giveupButton.length).toBe(0);
    });
  });

  describe("word has not been guessed and has given up", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: false,
        gaveup: true,
        customSecretWord: "none",
      };
      wrapper = setup(initialState);
    });

    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });

    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });

    test("do not render giveup button", () => {
      const giveupButton = findByTestAttr(wrapper, "giveup-button");
      expect(giveupButton.length).toBe(0);
    });
  });

  describe("setting new secret custom word", () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        success: false,
        gaveup: false,
        customSecretWord: "in progress",
      };
      wrapper = setup(initialState);
    });

    test("no render component", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(0);
    });
  });
});

describe("Redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("has gaveup piece of state as prop", () => {
    const gaveup = true;
    const wrapper = setup({ gaveup });
    const gaveupProp = wrapper.instance().props.gaveup;
    expect(gaveupProp).toBe(gaveup);
  });

  test("has customSecretWord piece of state as prop", () => {
    const customSecretWord = "none";
    const wrapper = setup({ customSecretWord });
    const customSecretWordProp = wrapper.instance().props.customSecretWord;
    expect(customSecretWordProp).toBe(customSecretWord);
  });

  test("guessWord action creator is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });

  test("giveUp action creator is a function prop", () => {
    const wrapper = setup();
    const giveUpProp = wrapper.instance().props.giveUp;
    expect(giveUpProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock, wrapper;
  const guessedWord = "train";

  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };

    wrapper = shallow(<UnconnectedInput {...props} />);

    //Add value to input box
    wrapper.setState({ currentGuess: guessedWord });

    //Simulate click on submit button
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("calls `guessWord` when submit button is clicked", () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test("calls `guessWord` with input value as argument", () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  test("input box clears on submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});

describe("`giveUp` action creator call", () => {
  let giveUpMock, wrapper;

  beforeEach(() => {
    giveUpMock = jest.fn();
    const props = {
      giveUp: giveUpMock,
    };

    wrapper = shallow(<UnconnectedInput {...props} />);

    const giveupButton = findByTestAttr(wrapper, "giveup-button");
    giveupButton.simulate("click");
  });

  test("calls `giveUp` when giveup button is clicked", () => {
    const giveUpCallCount = giveUpMock.mock.calls.length;
    expect(giveUpCallCount).toBe(1);
  });
});
