import React from "react";

/**
 * Functional react component for congratulory message
 * @function
 * @param {object} props - React props
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
export default ({ success }) => {
  if (success)
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word
        </span>
      </div>
    );
  else return <div data-test="component-congrats" />;
};
