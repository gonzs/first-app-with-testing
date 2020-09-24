import { types } from "../Actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_SECRET_WORD:
      return action.payload;

    default:
      return state;
  }
};
