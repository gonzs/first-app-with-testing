import React from "react";

/**
 * Functional react component for server error message
 * @function
 * @param {object} props - React props
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
const ServerError = () => {
  return (
    <div data-test="component-server-error" className="alert alert-danger">
      There was an error receiving the secret word.
      <br />
      Please try again later.
    </div>
  );
};

export default ServerError;
