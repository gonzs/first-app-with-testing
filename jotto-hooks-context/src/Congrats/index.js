import PropTypes from "prop-types";
import React from "react";
import LanguageContext from "../Context/languageContext";
import stringsModule from "../Helpers/strings";

/**
 * Functional react component for congratulory message
 * @function
 * @param {object} props - React props
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
const Congrats = ({ success }) => {
  const language = React.useContext(LanguageContext);

  if (success)
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  else return <div data-test="component-congrats" />;
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
