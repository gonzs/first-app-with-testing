import { combineReducers } from "redux";
import success from "./success";
import guessedWords from "./guessedWords";
import secretWord from "./secretWord";
import gaveup from "./gaveup";
import customSecretWord from "./customSecretWord";

export default combineReducers({
  success,
  gaveup,
  guessedWords,
  secretWord,
  customSecretWord,
});
