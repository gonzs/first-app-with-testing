import { types } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case types.SERVER_ERROR:
      return true;
    case types.RESET_GAME:
      return false;

    default:
      return state;
  }
};
