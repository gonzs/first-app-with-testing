import React from "react";
import successContext from "../Context/successContext";
import LanguageContext from "../Context/languageContext";
import stringsModule from "../Helpers/strings";

/**
 * Functional react component for congratulory message
 * @function
 * @return {JSX.Element} -Rendered component (or  null if succes prop is false)
 */
const Congrats = () => {
  const [success] = successContext.useSuccess();
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

export default Congrats;
