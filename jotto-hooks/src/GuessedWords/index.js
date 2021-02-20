import React from "react";
import PropTypes from "prop-types";
import LanguageContext from "../Context/languageContext";
import stringsModule from "../Helpers/strings";

const GuessedWords = (props) => {
  const language = React.useContext(LanguageContext);

  let contents;
  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="component-instructions">
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = props.guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{index + 1}</td>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));

    contents = (
      <span data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-ligth">
            <tr>
              <th>#</th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </span>
    );
  }

  const component =
    props.customSecretWord !== "in progress" ? (
      <div data-test="component-guessed-words">{contents}</div>
    ) : null;

  return <span>{component}</span>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  customSecretWord: PropTypes.string.isRequired,
};

export default GuessedWords;
