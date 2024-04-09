import { useState, useCallback } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import { LoadMore, LoadingAnimation } from "../components";

function TopRatedMovies() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  return (
    <>
      {isLoading && <LoadingAnimation />}

      <div>
        <h1 className="page-heading">Top Rated Movies</h1>
        <LoadMore
          url={topRatedUrl}
          onLoading={handleLoading}
          onLoaded={handleLoaded}
        />
      </div>
    </>
  );
}

export default TopRatedMovies;
