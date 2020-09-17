import {
  CORRECT_GUESS,
  GUESS_WORD,
  SET_SECRET_WORD,
  RESET_GAME,
  GIVE_UP,
  CUSTOM_SECRET_WORD,
  SERVER_ERROR,
} from "./types";
import { getLetterMatchCount } from "../../Helpers";
import axios from "axios";

export function correctGuess() {
  return { type: CORRECT_GUESS };
}

export function guessWord(guessedWord) {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) dispatch(correctGuess());
  };
}

export function setSecretWord(word) {
  return {
    type: SET_SECRET_WORD,
    payload: word,
  };
}

export function callSecretWordEndpoint(dispatch) {
  return axios
    .get("http://localhost:3030")
    .then((response) => dispatch(setSecretWord(response.data)))
    .catch((error) => {
      // client received an error response (5xx, 4xx)
      dispatch(serverError());
    });
}

export function getSecretWord() {
  return (dispatch) => callSecretWordEndpoint(dispatch);
}

export function resetGame() {
  return (dispatch) => {
    dispatch({ type: RESET_GAME });
    return callSecretWordEndpoint(dispatch);
  };
}

export function giveUp() {
  return { type: GIVE_UP };
}

export function setCustomSecretWord(status) {
  return { type: CUSTOM_SECRET_WORD, payload: status };
}

export function serverError() {
  return { type: SERVER_ERROR };
}
