import { CORRECT_GUESS, RESET_GAME } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case CORRECT_GUESS:
      return true;
    case RESET_GAME:
      return false;

    default:
      return state;
  }
};
