import React, { Component } from "react";
import "./App.css";
import Congrats from "../Congrats";
import GuessedWords from "../GuessedWords";
import Input from "../Input";
import { connect } from "react-redux";
import { getSecretWord } from "../Redux/Actions";
import TotalGuesses from "../TotalGuesses";
import Reset from "../Reset";
import SecretWordReveal from "../SecretWordReveal";
import CustomSecretWord from "../CustomSecretWord";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div data-test="app-component" className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <SecretWordReveal
          gaveup={this.props.gaveup}
          secretWord={this.props.secretWord}
        />
        <Input />
        <Reset />
        <GuessedWords
          guessedWords={this.props.guessedWords}
          customSecretWord={this.props.customSecretWord}
        />
        <TotalGuesses totalWords={this.props.guessedWords.length} />

        <CustomSecretWord
          customSecretWord={this.props.customSecretWord}
          guessedWords={this.props.guessedWords.length}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, gaveup, guessedWords, secretWord, customSecretWord } = state;
  return { success, gaveup, guessedWords, secretWord, customSecretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
