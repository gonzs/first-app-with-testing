import { types } from "../Actions/types";
import gaveupReducer from "./gaveup";

test("returns default initial state of false when no action is passed", () => {
  const newState = gaveupReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type GIVE_UP", () => {
  const newState = gaveupReducer(undefined, { type: types.GIVE_UP });
  expect(newState).toBe(true);
});

test("returns state of true upon receiving an action of type RESET_GAME", () => {
  const newState = gaveupReducer(undefined, { type: types.RESET_GAME });
  expect(newState).toBe(false);
});
