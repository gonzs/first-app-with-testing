import { CORRECT_GUESS, GUESS_WORD } from "./types";
import { getLetterMatchCount } from "../../Helpers";

export function correctGuess() {
  return { type: CORRECT_GUESS };
}

export function guessWord(guessedWord) {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) dispatch({ type: CORRECT_GUESS });
  };
}
