const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
  },
  es: {
    congrats: "Felicitaciones! Adivinaste la palabra",
    submit: "Enviar",
    guessPrompt: "Intenta adivinar la palabra secreta!",
    guessInputPlaceholder: "Intenta adivinar",
    guessColumnHeader: "Palabras adivinadas",
    guessedWords: "Aciertos",
    matchingLettersColumnHeader: "Coincidencia de letras",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🆎",
    guessInputPlaceholder: "⌨🤔",
    guessColumnHeader: "🤷‍♂️🤷‍♀️🆎",
    guessedWords: "🤷‍♀️🤷‍♂️",
    matchingLettersColumnHeader: "✅",
  },
};

function getStringByLanguage(
  languageCode,
  stringKey,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

export default {
  getStringByLanguage,
};
