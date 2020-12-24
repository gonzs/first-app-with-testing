import React from "react";
import HookActions from "../Actions/HookActions";
import "./App.css";

const SET_SECRET_WORD = "setSecretWord";

const initialState = { secretWord: null };

function reducer(state, action) {
  switch (action.type) {
    case SET_SECRET_WORD:
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`Invalid action type:${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = (secretWord) =>
    dispatch({ type: SET_SECRET_WORD, payload: secretWord });

  React.useEffect(() => {
    HookActions.getSecretWord(setSecretWord);
  }, []);

  return <div data-test="app-component">{state.secretWord}</div>;
}

export default App;
