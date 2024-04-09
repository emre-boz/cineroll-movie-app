import { useState, useEffect, useCallback } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/trending-movies-page.css";
import {
  LoadMore,
  AnimatedToggleButton,
  LoadingAnimation,
} from "../components";

function Trending() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const [displayItem, setDisplayItem] = useState(true);

  const handleLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);
 
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`;

  useEffect(() => {
    displayItem == true ? setTimeWindow("day") : setTimeWindow("week");
  }, [displayItem]);

  return (
    <>
      <h1 className="page-heading">Trending Movies</h1>

      <AnimatedToggleButton
        optionAname="Today"
        optionBname="This Week"
        onClick={() => setDisplayItem(!displayItem)}
        displayItem={displayItem}
      />
      {isLoading && <LoadingAnimation />}

      <LoadMore
        url={trendingUrl}
        onLoading={handleLoading}
        onLoaded={handleLoaded}
      />
    </>
  );
}

export default Trending;
