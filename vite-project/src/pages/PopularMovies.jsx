import { useState, useCallback } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import { LoadMore, LoadingAnimation } from "../components";

function Popular() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  return (
    <>
      {isLoading && <LoadingAnimation />}

      <div>
        
        <h1 className="page-heading">Popular Movies</h1>
        <LoadMore
          url={popularUrl}
          onLoading={handleLoading}
          onLoaded={handleLoaded}
        />
      </div>
    </>
  );
}

export default Popular;
