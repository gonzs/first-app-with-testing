import { types } from "../Actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.GUESS_WORD:
      return [...state, action.payload];
    case types.RESET_GAME:
      return [];

    default:
      return state;
  }
};
