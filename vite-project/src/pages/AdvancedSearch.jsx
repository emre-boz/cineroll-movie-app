import { useState, useCallback, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/advanced-search-page.css";
import {
  LoadingAnimation,
  MovieGenres,
  LoadMore,
  AntRangeSlider,
  AntDatePicker,
  AntSelect,
} from "../components";
import languageCodesJSON from "../assets/data/languageCodes.json";

function AdvancedSearch() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFlters] = useState({});
  const [filterUrl, setFilterUrl] = useState("");

  const handleLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  const [sortOptions, setSortOptions] = useState([
    { code: "original_title.asc", name: "Original Title Ascending" },
    { code: "original_title.desc", name: "Original Title Descending" },
    { code: "popularity.asc", name: "Popularity Ascending" },
    { code: "popularity.desc", name: "Popularity Descending" },
    { code: "revenue.asc", name: "Revenue Ascending" },
    { code: "revenue.desc", name: "Revenue Descending" },
    {
      code: "primary_release_date.asc",
      name: "Primary Release Date Ascending",
    },
    {
      code: "primary_release_date.desc",
      name: "Primary Release Date Descending",
    },
    { code: "title.asc", name: "Title Ascending" },
    { code: "title.desc", name: "Title Descending" },
    { code: "vote_average.asc", name: "Vote Average Ascending" },
    { code: "vote_average.desc", name: "Vote Average Descending" },
    { code: "vote_count.asc", name: "Vote Count Ascending" },
    { code: "vote_count.desc", name: "Vote Count Descending" },
  ]);

  const [languageOptions, setLanguageOptions] = useState(
    Object.entries(languageCodesJSON).map(([code, name]) => {
      return { code, name };
    })
  );

  function prevent(e) {
    e.preventDefault();
  }

  function formElementsCombiner(event, dataName, values) {
    let name;
    let value;
    if (event) {
      name = event.target.name;
      value = event.target.value;
    } else {
      name = dataName;
      value = values;
    }

    setFlters((values) => ({ ...values, [name]: value }));
  }

  function filterUrlMaker(apiKey) {
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";

    let url = `${baseUrl}?api_key=${apiKey}`;

    let propertyNames = [
      "with_original_language",
      "sort_by",
      "with_genres",
      "with_runtime.gte",
      "with_runtime.lte",
      "vote_average.gte",
      "vote_average.lte",
      "primary_release_date.gte",
      "primary_release_date.lte",
    ];

    for (let i = 0; i < propertyNames.length; i++) {
      let propertyName = propertyNames[i].toString();
      if (filters.hasOwnProperty(propertyName)) {
        url = url + `&${propertyName}=${filters[propertyName]}`;
      } else {
        continue;
      }
    }

    setFilterUrl(url);
  }

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  if (isPageLoading) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <form
        className="filter-form"
        onSubmit={prevent}
        onChange={() => {
        }}
      >
        <h1 className="page-heading">Advanced Search</h1>

        <AntSelect
          title="Language"
          formElementsCombiner={formElementsCombiner}
          options={languageOptions}
          selectName="with_original_language"
        />

        <MovieGenres
          title="Genres"
          formElementsCombiner={formElementsCombiner}
        />

        <AntSelect
          title="Sort"
          formElementsCombiner={formElementsCombiner}
          options={sortOptions}
          selectName="sort_by"
        />

        <AntRangeSlider
          title="Rating"
          formElementsCombiner={formElementsCombiner}
          min={0}
          max={10}
          step={1}
        />

        <AntRangeSlider
          formElementsCombiner={formElementsCombiner}
          title="Runtime"
          min={0}
          max={400}
          step={10}
        />

        <AntDatePicker
          title="Release Dates"
          formElementsCombiner={formElementsCombiner}
        />

        <button
          className="load-more-btn"
          type="submit"
          onClick={() => {
            filterUrlMaker(apiKey);
            setIsLoading(true);
          }}
        >
          Search
        </button>
      </form>
      {isLoading && <LoadingAnimation />}
      {filterUrl && (
        <LoadMore
          url={filterUrl}
          onLoading={handleLoading}
          onLoaded={handleLoaded}
        />
      )}
    </>
  );
}

export default AdvancedSearch;
