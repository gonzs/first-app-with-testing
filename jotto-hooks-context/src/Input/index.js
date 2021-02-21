import React from "react";
import PropTypes from "prop-types";
import SuccessContext from "../Context/successContext";
import GuessedWordsContext from "../Context/guessedWordsContext";
import LanguageContext from "../Context/languageContext";
import stringsModule from "../Helpers/strings";
import { getLetterMatchCount } from "../Helpers/index";

const Input = ({ secretWord }) => {
  const language = React.useContext(LanguageContext);
  const [success, setSuccess] = SuccessContext.useSuccess();
  const [guessedWords, setGuessedWords] = GuessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) return null;

  return (
    <div data-test="input-component">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            // Update guessedWords
            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );
            setGuessedWords([
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount: letterMatchCount },
            ]);
            // Check against secretWord and update success if needed
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            // Clearing current guess
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
