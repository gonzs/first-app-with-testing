import { types } from "../Actions/types";
import customSecretWordReducer from "./customSecretWord";

test("returns default initial state of `none` when no action is passed", () => {
  const newState = customSecretWordReducer(undefined, {});
  expect(newState).toBe("none");
});

test("returns state of `in progress` upon receiving a that payload", () => {
  const newState = customSecretWordReducer(undefined, {
    type: types.CUSTOM_SECRET_WORD,
    payload: "in progress",
  });
  expect(newState).toBe("in progress");
});

test("returns state of `done` upon receiving a that payload", () => {
  const newState = customSecretWordReducer(undefined, {
    type: types.CUSTOM_SECRET_WORD,
    payload: "done",
  });
  expect(newState).toBe("done");
});

test("returns state of true upon receiving an action of type RESET_GAME", () => {
  const newState = customSecretWordReducer(undefined, {
    type: types.RESET_GAME,
  });
  expect(newState).toBe("none");
});
