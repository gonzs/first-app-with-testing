import React from "react";
import LanguageContext from "../Context/languageContext";
import stringsModule from "../Helpers/strings";
import guessedWordsContext from "../Context/guessedWordsContext";

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(LanguageContext);

  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="component-instructions">
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
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

  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
