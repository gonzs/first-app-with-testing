import { storeFactory } from "../../test/testUtils";
import { guessWord, resetGame, giveUp } from "./Actions";
import moxios from "moxios";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";

  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        gaveup: false,
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }],
        customSecretWord: "none",
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        gaveup: false,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
        customSecretWord: "none",
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for give up", () => {
      store.dispatch(giveUp());
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        gaveup: true,
        guessedWords: [],
        customSecretWord: "none",
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe("some guessed words", () => {
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = { guessedWords, secretWord };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        gaveup: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
        ],
        customSecretWord: "none",
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        gaveup: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 },
        ],
        customSecretWord: "none",
        serverError: false,
      };
      expect(newState).toEqual(expectedState);
    });
  });
});

describe("resetGame action dispatcher", () => {
  let store;
  const secretWord = "party";
  const newSecretWord = "train";
  const initialState = {
    secretWord,
    success: true,
    gaveup: false,
    guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
    customSecretWord: "none",
    serverError: false,
  };
  beforeEach(() => {
    store = storeFactory(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("updates state correctly for reset game", () => {
    const expectedState = {
      secretWord: newSecretWord,
      success: false,
      gaveup: false,
      guessedWords: [],
      customSecretWord: "none",
      serverError: false,
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: newSecretWord });
    });
    return store.dispatch(resetGame()).then(() => {
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });
  });
});
