import { IS_FETCHING, RESET_GAME } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return action.payload;

    case RESET_GAME:
      return false;

    default:
      return state;
  }
};
