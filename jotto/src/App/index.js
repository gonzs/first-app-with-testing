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
import Loading from "../Loading";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    if (this.props.isFetching)
      return (
        <div className="container mt-5" data-test="loading-component">
          <Loading />
        </div>
      );

    if (this.props.serverError)
      return (
        <div className="container mt-5" data-test="error-component">
          <h1>Jotto</h1>
          <ServerError />
        </div>
      );

    return (
      <div className="container mt-5" data-test="app-component">
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
  const {
    success,
    gaveup,
    guessedWords,
    secretWord,
    customSecretWord,
    serverError,
    isFetching,
  } = state;
  return {
    success,
    gaveup,
    guessedWords,
    secretWord,
    customSecretWord,
    serverError,
    isFetching,
  };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
