import {
  CORRECT_GUESS,
  GUESS_WORD,
  SET_SECRET_WORD,
  RESET_GAME,
  GIVE_UP,
  CUSTOM_SECRET_WORD,
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

export function getSecretWordDispatch(dispatch) {
  return axios
    .get("http://localhost:3030")
    .then((response) => dispatch(setSecretWord(response.data)));
}

export function getSecretWord() {
  return getSecretWordDispatch;
}

export function resetGame() {
  return (dispatch) => {
    dispatch({ type: RESET_GAME });
    return getSecretWordDispatch(dispatch);
  };
}

export function giveUp() {
  return { type: GIVE_UP };
}

export function setCustomSecretWord(status) {
  return { type: CUSTOM_SECRET_WORD, payload: status };
}
