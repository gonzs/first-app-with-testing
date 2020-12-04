/**
 * @method getLetterMatchCount
 * @param {string} guessedWord
 * @param {string} secretWord
 * @returns {number}
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const guessedLetterSet = new Set(guessedWord.split(""));
  const secretLetterSet = new Set(secretWord.split(""));

  return [...secretLetterSet].filter((letter) => guessedLetterSet.has(letter))
    .length;
}
