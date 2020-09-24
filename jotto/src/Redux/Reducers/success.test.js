import { types } from "../Actions/types";
import successReducer from "./success";

test("returns default initial state of `false` when no action is passed", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const newState = successReducer(undefined, { type: types.CORRECT_GUESS });
  expect(newState).toBe(true);
});

test("returns state of false upon receiving an action of type `RESET_GAME`", () => {
  const newState = successReducer(undefined, { type: types.RESET_GAME });
  expect(newState).toBe(false);
});
