import { GUESS_WORD, RESET_GAME } from "../Actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GUESS_WORD:
      return [...state, action.payload];
    case RESET_GAME:
      return [];

    default:
      return state;
  }
};
