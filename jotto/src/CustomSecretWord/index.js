import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCustomSecretWord, setSecretWord } from "../Redux/Actions";

export class UnconnectedCustomSecretWord extends Component {
  constructor(props) {
    super(props);

    this.state = { currentWord: null };

    this.onSubmitWord = this.onSubmitWord.bind(this);
    this.onEnterWord = this.onEnterWord.bind(this);
  }

  onSubmitWord() {
    this.props.setSecretWord(this.state.currentWord);
    this.setState({ currentWord: "" });
    this.props.setCustomSecretWord("done");
  }

  onEnterWord() {
    this.props.setCustomSecretWord("in progress");
  }

  render() {
    const contents =
      this.props.customSecretWord === "in progress" ? (
        <div data-test="input-custom-secretword">
          <input
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter your Secret Word"
            value={this.state.currentWord}
            onChange={(e) => this.setState({ currentWord: e.target.value })}
            oncClick={() => this.onSubmitWord}
          ></input>
          <button
            data-test="button-submit-word"
            className="btn btn-primary mb-2"
            onClick={() => {
              this.onSubmitWord();
            }}
          >
            Submit
          </button>
        </div>
      ) : this.props.customSecretWord === "none" ? (
        <div>
          <button
            data-test="button-enter-word"
            className="btn btn-warning mb-2 p mt-sm-5"
            onClick={() => {
              this.onEnterWord();
            }}
          >
            Enter your New Word
          </button>
        </div>
      ) : null;

    return this.props.guessedWords !== 0 ? null : (
      <div data-test="component-custom-secretword">{contents}</div>
    );
  }
}

UnconnectedCustomSecretWord.propTypes = {
  customSecretWord: PropTypes.string.isRequired,
  guessedWords: PropTypes.number.isRequired,
  setCustomSecretWord: PropTypes.func,
  setSecretWord: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { setCustomSecretWord, setSecretWord })(
  UnconnectedCustomSecretWord
);
