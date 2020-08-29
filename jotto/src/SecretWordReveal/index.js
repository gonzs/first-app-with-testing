import React from "react";
import PropTypes from "prop-types";

const SecretWordReveal = (props) => {
  const contents = props.gaveup ? (
    <div data-test="reveal-msg" className="alert alert-danger">
      <span>
        The secret word was "{props.secretWord}"<br />
        Better luck next time!
      </span>
    </div>
  ) : null;

  return <div data-test="secretword-reveal-component">{contents}</div>;
};

SecretWordReveal.propTypes = {
  secretWord: PropTypes.string,
  gaveup: PropTypes.bool.isRequired,
};

export default SecretWordReveal;
