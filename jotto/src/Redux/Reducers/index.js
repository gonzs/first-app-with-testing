import { combineReducers } from "redux";
import success from "./success";
import guessedWords from "./guessedWords";
import secretWord from "./secretWord";
import gaveup from "./gaveup";
import customSecretWord from "./customSecretWord";
import serverError from "./serverError";
import isFetching from "./isFetching";

export default combineReducers({
  success,
  gaveup,
  guessedWords,
  secretWord,
  customSecretWord,
  serverError,
  isFetching,
});
