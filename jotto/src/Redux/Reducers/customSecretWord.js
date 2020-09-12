import { CUSTOM_SECRET_WORD, RESET_GAME } from "../Actions/types";

export default (state = "none", action) => {
  switch (action.type) {
    case CUSTOM_SECRET_WORD:
      return action.payload;
    case RESET_GAME:
      return "none";

    default:
      return state;
  }
};
