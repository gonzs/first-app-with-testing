import { CORRECT_GUESS } from "../Actions/types";
import successReducer from "./success";

test("returns default initial state of `false` when no action is passed", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const newState = successReducer(undefined, { type: CORRECT_GUESS });
  expect(newState).toBe(true);
});
