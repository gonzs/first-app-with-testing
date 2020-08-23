import {
  CORRECT_GUESS,
  GUESS_WORD,
  SET_SECRET_WORD,
  RESET_GAME,
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

export function getSecretWord() {
  return (dispatch) => {
    return axios
      .get("http://localhost:3030")
      .then((response) =>
        dispatch({ type: SET_SECRET_WORD, payload: response.data })
      );
  };
}

export function resetGame() {
  return (dispatch) => {
    dispatch({ type: RESET_GAME });
    dispatch(getSecretWord());
  };
}
