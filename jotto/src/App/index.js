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
import ServerError from "../ServerError";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    const content = this.props.serverError ? (
      <div data-test="error-component">
        <ServerError />
      </div>
    ) : (
      <div data-test="app-component">
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

    return <div className="container mt-5">{content}</div>;
  }
}

const mapStateToProps = (state) => {
  const {
    success,
    gaveup,
    guessedWords,
    secretWord,
    customSecretWord,
    serverError,
  } = state;
  return {
    success,
    gaveup,
    guessedWords,
    secretWord,
    customSecretWord,
    serverError,
  };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
