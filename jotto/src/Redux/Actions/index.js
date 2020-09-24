import { types } from "./types";
import { getLetterMatchCount } from "../../Helpers";
import axios from "axios";

export function correctGuess() {
  return { type: types.CORRECT_GUESS };
}

export function guessWord(guessedWord) {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: types.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) dispatch(correctGuess());
  };
}

export function setSecretWord(word) {
  return {
    type: types.SET_SECRET_WORD,
    payload: word,
  };
}

export function callSecretWordEndpoint(dispatch) {
  dispatch(isFetching(true));
  return axios
    .get("http://localhost:3030")
    .then((response) => dispatch(setSecretWord(response.data)))
    .catch(() => {
      // client received an error response (5xx, 4xx)
      dispatch(serverError());
    })
    .finally(() => dispatch(isFetching(false)));
}

export function getSecretWord() {
  return (dispatch) => callSecretWordEndpoint(dispatch);
}

export function resetGame() {
  return (dispatch) => {
    dispatch({ type: types.RESET_GAME });
    return callSecretWordEndpoint(dispatch);
  };
}

export function giveUp() {
  return { type: types.GIVE_UP };
}

export function setCustomSecretWord(status) {
  return { type: types.CUSTOM_SECRET_WORD, payload: status };
}

export function serverError() {
  return { type: types.SERVER_ERROR };
}

export function isFetching(status) {
  return { type: types.IS_FETCHING, payload: status };
}
