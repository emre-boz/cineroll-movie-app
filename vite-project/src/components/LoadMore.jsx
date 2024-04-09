import { useState, useEffect } from "react";
import GridDisplay from "./GridDisplay";
import ErrorFetch from "./ErrorFetch";

function LoadMore({ url, onLoading, onLoaded }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      if (url) {
        try {
          onLoading && onLoading();
          const response = await fetch(`${url}&page=${page}`);
          const data = await response.json();
          setTotalPages(data.total_pages);
          setMovies(page === 1 ? data.results : [...movies, ...data.results]);
          onLoaded && onLoaded();
        } catch (error) {
          setError(true);
          console.error("Error fetching movies:", error);
        }
      }
    }

    fetchMovies();
  }, [url, page, onLoading, onLoaded]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  if (error) {
    console.log('error',error);
    onLoaded();
    return <ErrorFetch />;
  }
  return (
    <div>
      <GridDisplay movies={movies} />
      {page < totalPages && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default LoadMore;
