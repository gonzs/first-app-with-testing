import React from "react";

/**
 * Functional react component for congratulory message
 * @function
 * @param {object} props - React props
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
const ServerError = () => {
  return (
    <div data-test="component-server-error" className="alert alert-danger">
      Server is not available
    </div>
  );
};

export default ServerError;
