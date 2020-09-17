import { SERVER_ERROR, RESET_GAME } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case SERVER_ERROR:
      return true;
    case RESET_GAME:
      return false;

    default:
      return state;
  }
};
