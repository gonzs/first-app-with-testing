import React from "react";
import "./App.css";
import HookActions from "../Actions/HookActions";
import languageContext from "../Context/languageContext";
import successContext from "../Context/successContext";
import guessedWordsContext from "../Context/guessedWordsContext";

import LanguagePicker from "../LanguagePicker";
import Input from "../Input";
import Congrats from "../Congrats";
import GuessedWords from "../GuessedWords";

const SET_SECRET_WORD = "setSecretWord";
const SET_LANGUAGE = "setLanguage";

const initialState = { secretWord: null, language: "en" };

function reducer(state, action) {
  switch (action.type) {
    case SET_SECRET_WORD:
      return { ...state, secretWord: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };

    default:
      throw new Error(`Invalid action type:${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = (secretWord) =>
    dispatch({ type: SET_SECRET_WORD, payload: secretWord });

  const setLanguage = (language) =>
    dispatch({ type: SET_LANGUAGE, payload: language });

  React.useEffect(() => {
    HookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner-component">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container" data-test="app-component">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />

        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>

          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
