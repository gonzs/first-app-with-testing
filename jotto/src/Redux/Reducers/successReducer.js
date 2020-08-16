import { CORRECT_GUESS } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case CORRECT_GUESS:
      return true;

    default:
      return state;
  }
};
