import { combineReducers } from "redux";
import success from "./success";
import guessedWords from "./guessedWords";
import secretWord from "./secretWord";

export default combineReducers({ success, guessedWords, secretWord });
