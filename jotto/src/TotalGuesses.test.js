import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import TotalGuesses from "./TotalGuesses";

const defaultProps = {
  totalWords: 3,
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(TotalGuesses, defaultProps);
});

describe("if there are no words guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ totalWords: 0 });
  });

  test("render without error", () => {
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.length).toBe(1);
  });

  test("no show total guesses", () => {
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.text().length).toBe(0);
  });
});

describe("if there are words guessed", () => {
  let wrapper;
  const totalWords = 3;

  beforeEach(() => {
    wrapper = setup({ totalWords: totalWords });
  });

  test("render without error", () => {
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.length).toBe(1);
  });

  test("show total guesses", () => {
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.text().length).not.toBe(0);
  });

  test("correct number of total guesses", () => {
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.text()).toContain(totalWords.toString());
  });
});
