import { types } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case types.CORRECT_GUESS:
      return true;
    case types.RESET_GAME:
      return false;

    default:
      return state;
  }
};
