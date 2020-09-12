import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, storeFactory } from "../../test/testUtils";
import CustomSecretWord, { UnconnectedCustomSecretWord } from "./";

const defaultProps = { customSecretWord: "none", guessedWords: 0 };

/**
 *  Factory function to create ShallowWrapper for the CustomSecretWord component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, initialState = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const store = storeFactory(initialState);
  const wrapper = shallow(<CustomSecretWord {...setupProps} store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("customSecretWord prop is `none` and empty guessedWords", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    test("renders without error", () => {
      const component = findByTestAttr(wrapper, "component-custom-secretword");
      expect(component.length).toBe(1);
    });

    test("renders no input field", () => {
      const input = findByTestAttr(wrapper, "input-custom-secretword");
      expect(input.length).toBe(0);
    });

    test("renders button to enter custom word", () => {
      const button = findByTestAttr(wrapper, "button-enter-word");
      expect(button.length).toBe(1);
    });
  });

  describe("customSecretWord prop is `in progress`", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ customSecretWord: "in progress" });
    });

    test("renders without error", () => {
      const component = findByTestAttr(wrapper, "component-custom-secretword");
      expect(component.length).toBe(1);
    });

    test("renders input", () => {
      const input = findByTestAttr(wrapper, "input-custom-secretword");
      expect(input.length).toBe(1);
    });

    test("renders no button to enter custom word ", () => {
      const button = findByTestAttr(wrapper, "button-enter-word");
      expect(button.length).toBe(0);
    });
  });

  describe("customSecretWord prop is `done`", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ customSecretWord: "done" });
    });

    test("renders without error", () => {
      const component = findByTestAttr(wrapper, "component-custom-secretword");
      expect(component.length).toBe(1);
    });

    test("renders no input field", () => {
      const input = findByTestAttr(wrapper, "input-custom-secretword");
      expect(input.length).toBe(0);
    });

    test("renders no button to enter custom word", () => {
      const button = findByTestAttr(wrapper, "button-enter-word");
      expect(button.length).toBe(0);
    });
  });
});

describe("does not throw error with expected props", () => {
  const expectedProps = { customSecretWord: "none", guessedWords: 0 };
  checkProps(CustomSecretWord, expectedProps);
});

describe("Redux props", () => {
  test("setCustomSecretWord action creator is a function prop", () => {
    const wrapper = setup();
    const setCustomSecretWordProp = wrapper.instance().props
      .setCustomSecretWord;
    expect(setCustomSecretWordProp).toBeInstanceOf(Function);
  });

  test("setSecretWord action creator is a function prop", () => {
    const wrapper = setup();
    const setSecretWordProp = wrapper.instance().props.setSecretWord;
    expect(setSecretWordProp).toBeInstanceOf(Function);
  });
});

describe("`setCustomSecretWord` action creator call", () => {
  let setCustomSecretWordMock, wrapper;

  beforeEach(() => {
    setCustomSecretWordMock = jest.fn();
    const props = {
      customSecretWord: "none",
      guessedWords: 0,
      setCustomSecretWord: setCustomSecretWordMock,
    };

    wrapper = shallow(<UnconnectedCustomSecretWord {...props} />);

    const submitButton = findByTestAttr(wrapper, "button-enter-word");
    submitButton.simulate("click");
  });

  test("calls `setCustomSecretWord` when submit button is clicked", () => {
    const setCustomSecretWordCount = setCustomSecretWordMock.mock.calls.length;
    expect(setCustomSecretWordCount).toBe(1);
  });
});

describe("`setSecretWord` action creator call", () => {
  let setSecretWordMock, setCustomSecretWordMock, wrapper;
  const word = "train";

  beforeEach(() => {
    setSecretWordMock = jest.fn();
    setCustomSecretWordMock = jest.fn();
    const props = {
      customSecretWord: "in progress",
      guessedWords: 0,
      setSecretWord: setSecretWordMock,
      setCustomSecretWord: setCustomSecretWordMock,
    };

    wrapper = shallow(<UnconnectedCustomSecretWord {...props} />);

    wrapper.setState({ currentWord: word });

    const submitButton = findByTestAttr(wrapper, "button-submit-word");
    submitButton.simulate("click");
  });

  test("calls `setSecretWord` when submit button is clicked", () => {
    const setSecretWordCount = setSecretWordMock.mock.calls.length;
    expect(setSecretWordCount).toBe(1);
  });

  test("calls `setSecretWord` with input value as argument", () => {
    const setSecretWordArg = setSecretWordMock.mock.calls[0][0];
    expect(setSecretWordArg).toBe(word);
  });

  test("input box clears on submit", () => {
    expect(wrapper.state("currentWord")).toBe("");
  });

  test("calls `setCustomSecretWord` when submit button is clicked", () => {
    const setCustomSecretWordCount = setCustomSecretWordMock.mock.calls.length;
    expect(setCustomSecretWordCount).toBe(1);
  });
});
