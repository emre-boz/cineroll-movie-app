import { useState, useEffect, useContext } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import { useNavigate } from "react-router-dom";
import { useData } from "./Header";

const SearchInput = () => {

  const { searchTerm, setSearchTerm, resultBox, setResultBox } = useData();

  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };
  function goToSearch(query) {
    navigate(`/search/query/${query}`);
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if(searchTerm==""){
        return
      }
      goToSearch(searchTerm);
      setResultBox(false);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
        );

        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
        } else {
          console.error("Error fetching search results:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

    debouncedFetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onClick={() => setResultBox(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies and people..."
        />
        <div className={`search-results-box ${resultBox ? "is-active" : ""}`}>
          {results.slice(0, 10).map((result) => (
            <div
              key={result.id}
              className="search-results-box-item"
              onClick={() => {
                setResultBox(false);
                result.media_type === "movie"
                  ? navigate(`/movie/id/${result.id}`)
                  : navigate(`/person/id/${result.id}`);
              }}
            >
              <h3>{result.title || result.name}</h3>
              <p>{result.media_type === "movie" ? "Film" : "Person"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
