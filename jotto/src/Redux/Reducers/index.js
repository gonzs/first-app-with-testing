import { combineReducers } from "redux";
import success from "./success";
import guessedWords from "./guessedWords";
import secretWord from "./secretWord";
import gaveup from "./gaveup";

export default combineReducers({ success, gaveup, guessedWords, secretWord });
