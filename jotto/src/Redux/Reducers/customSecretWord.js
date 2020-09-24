import { types } from "../Actions/types";

export default (state = "none", action) => {
  switch (action.type) {
    case types.CUSTOM_SECRET_WORD:
      return action.payload;
    case types.RESET_GAME:
      return "none";

    default:
      return state;
  }
};
