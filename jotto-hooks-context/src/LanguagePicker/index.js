import React from "react";
import propTypes from "prop-types";

function LanguagePicker(props) {
  const languages = [
    {
      code: "en",
      symbol: "🇺🇸",
    },
    {
      code: "es",
      symbol: "🇪🇸",
    },
    {
      code: "emoji",
      symbol: "😀",
    },
  ];

  const languagesIcons = languages.map((lang) => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => props.setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return <div data-test="component-language-picker">{languagesIcons}</div>;
}
LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
