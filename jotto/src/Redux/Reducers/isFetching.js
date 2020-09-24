import { types } from "../Actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return action.payload;

    case types.RESET_GAME:
      return false;

    default:
      return state;
  }
};
