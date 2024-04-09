import languageCodesJSON from "../assets/data/languageCodes.json";

const Languages = ({formElementsCombiner}) => {

  const languageOptions = Object.entries(languageCodesJSON).map(([code, name]) => {
    return { code, name };
  });

  return (
    <div>
      <label htmlFor="languageSelect">Select a language: </label>
      <select
        name="with_original_language"
        id="languageSelect"
        
        onChange={formElementsCombiner}
      >
        <option value="">Select...</option>
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Languages;

