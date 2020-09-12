import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord, giveUp } from "../Redux/Actions";

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    this.state = { currentGuess: null };

    this.submitGuessedWord = this.submitGuessedWord.bind(this);
    this.onGiveUp = this.onGiveUp.bind(this);
  }

  submitGuessedWord(e) {
    e.preventDefault();
    const guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0)
      this.props.guessWord(guessedWord);

    this.setState({ currentGuess: "" });
  }

  onGiveUp() {
    this.props.giveUp();
    this.setState({ currentGuess: "" });
  }

  render() {
    const contents =
      this.props.success || this.props.gaveup ? null : (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter guess"
            value={this.state.currentGuess}
            onChange={(e) => {
              this.setState({ currentGuess: e.target.value });
            }}
          />
          <button
            data-test="submit-button"
            type="submit"
            className="btn btn-primary mb-2"
            onClick={(e) => this.submitGuessedWord(e)}
          >
            Guess
          </button>
          <button
            data-test="giveup-button"
            className="btn btn-primary mb-2"
            onClick={() => this.onGiveUp()}
          >
            Give Up
          </button>
        </form>
      );
    const component =
      this.props.customSecretWord !== "in progress" ? (
        <div data-test="component-input">{contents}</div>
      ) : null;

    return <span>{component}</span>;
  }
}

const mapStateToProps = ({ success, gaveup, customSecretWord }) => {
  return { success, gaveup, customSecretWord };
};

export default connect(mapStateToProps, { guessWord, giveUp })(
  UnconnectedInput
);
