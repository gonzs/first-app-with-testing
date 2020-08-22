import React from "react";
import PropTypes from "prop-types";

const TotalGuesses = ({ totalWords }) => {
  return (
    <div data-test="component-total-guesses">
      {totalWords > 0 && <h6>Total Guesses: {totalWords}</h6>}
    </div>
  );
};

TotalGuesses.propTypes = {
  totalWords: PropTypes.number.isRequired,
};

export default TotalGuesses;
