import { correctGuess, getSecretWord, giveUp } from "./";
import { CORRECT_GUESS, GIVE_UP } from "./types";
import moxios from "moxios";
import { storeFactory } from "../../../test/testUtils";

describe("correctGuess", () => {
  test("returns an action type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toEqual({ type: CORRECT_GUESS });
  });
});

describe("giveUp", () => {
  test("returns an action type `GIVE_UP`", () => {
    const action = giveUp();
    expect(action).toEqual({ type: GIVE_UP });
  });
});

describe("getSecretWord action creator", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("adds response word to state", () => {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: secretWord });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});
