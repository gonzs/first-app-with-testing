import React from "react";
import PropTypes from "prop-types";

const TotalGuesses = (props) => {
  const total = props.guessedWords.length;
  return (
    <div data-test="component-total-guesses">
      {total > 0 && <h6>Total Guesses: {total}</h6>}
    </div>
  );
};

TotalGuesses.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TotalGuesses;
