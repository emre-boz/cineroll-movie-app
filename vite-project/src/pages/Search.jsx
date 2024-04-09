import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/search-page.css";
import {
  CardWide,
  CardWidePerson,
  AnimatedToggleButton,
  LoadingAnimation,
  ErrorFetch
} from "../components";

function Search() {
  const { query } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentCategory, setCurrentCategory] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);
  const [displayItem, setDisplayItem] = useState(false);

  async function fetchCounts() {
    setIsLoading(true);

    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      const movieData = await movieResponse.json();
      setMovieCount(movieData.total_results.toString());

      const personResponse = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${query}`
      );
      const personData = await personResponse.json();
      setPersonCount(personData.total_results.toString());
      setCurrentCategory(
        movieData.total_results >= personData.total_results ? "movie" : "person"
      );
      setDisplayItem(
        movieData.total_results >= personData.total_results ? true : false
      );
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (query) {
      setResults([]);
      setCurrentPage(1);
      setTotalPages(0);
      fetchCounts();
    }
  }, [query, apiKey]);

  useEffect(() => {
    if (!currentCategory || !query) return;
    const fetchResults = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${currentCategory}?api_key=${apiKey}&query=${query}&page=${currentPage}`
      );
      const data = await response.json();
      if (currentPage === 1) {
        setResults(data.results);
      } else {
        setResults((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    };

    fetchResults();
  }, [query, currentCategory, currentPage, apiKey]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setResults([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    displayItem == true
      ? handleCategoryChange("movie")
      : handleCategoryChange("person");
  }, [displayItem]);

  if (error) {
    return <ErrorFetch />;
  }

  return (
    <div className="search-page">
      {isLoading && <LoadingAnimation />}
      {movieCount && personCount && (
        <AnimatedToggleButton
          optionAname={`Movies(${movieCount})`}
          optionBname={`People(${personCount})`}
          onClick={() => setDisplayItem(!displayItem)}
          displayItem={displayItem}
        />
      )}

      <div>
        {results.length > 0 ? (
          <div className="search-page-results">
            {results.map((result) =>
              result.hasOwnProperty("title") == true ? (
                <CardWide movie={result} />
              ) : (
                <CardWidePerson person={result} cardType="search" />
              )
            )}
            {currentPage < totalPages && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
