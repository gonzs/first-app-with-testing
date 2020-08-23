import React, { Component } from "react";
import { connect } from "react-redux";
import { resetGame } from "./Redux/Actions";

export class UnconnectedReset extends Component {
  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
  }

  onReset(e) {
    e.preventDefault();
    this.props.resetGame();
  }

  render() {
    const contents = !this.props.success ? null : (
      <button
        data-test="reset-button"
        type="submit"
        className="btn btn-secondary mb-2"
        onClick={(e) => this.onReset(e)}
      >
        New Word
      </button>
    );
    return <div data-test="component-reset">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { resetGame })(UnconnectedReset);
