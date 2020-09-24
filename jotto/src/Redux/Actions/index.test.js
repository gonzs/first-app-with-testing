import {
  correctGuess,
  fetching,
  getSecretWord,
  giveUp,
  serverError,
  isFetching,
} from "./";
import types from "./types";
import moxios from "moxios";
import { storeFactory } from "../../../test/testUtils";

describe("correctGuess action creator", () => {
  test("returns an action type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toEqual({ type: types.CORRECT_GUESS });
  });
});

describe("giveUp creator", () => {
  test("returns an action type `GIVE_UP`", () => {
    const action = giveUp();
    expect(action).toEqual({ type: types.GIVE_UP });
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
      expect(newState.serverError).toBe(false);
      expect(newState.isFetching).toBe(false);
    });
  });

  test("adds error of connection to state", () => {
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 401 });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.serverError).toBe(true);
      expect(newState.isFetching).toBe(false);
    });
  });
});

describe("serverError action creator", () => {
  test("returns an action type `SERVER_ERROR`", () => {
    const action = serverError();
    expect(action).toEqual({ type: types.SERVER_ERROR });
  });
});

describe("isFetching action creator", () => {
  test("returns an action type `IS_FETCHING`", () => {
    const action = isFetching(true);
    expect(action).toEqual({ type: types.IS_FETCHING, payload: true });
  });
});
