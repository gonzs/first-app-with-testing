import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congratulory message
 * @function
 * @param {object} props - React props
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
const Congrats = ({ success }) => {
  if (success)
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word
        </span>
      </div>
    );
  else return <div data-test="component-congrats" />;
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
