import { GIVE_UP, RESET_GAME } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case GIVE_UP:
      return true;

    case RESET_GAME:
      return false;

    default:
      return state;
  }
};
