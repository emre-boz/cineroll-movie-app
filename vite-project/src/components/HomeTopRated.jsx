import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import CardSlider from "./CardSlider";
import LoadingAnimation from "./LoadingAnimation";
import IconHeading from "./IconHeading";
function HomeTopRated() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  const fetchMovies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(topRatedUrl);
      const responseJson = await response.json();
      let data = responseJson.results;
      setMovies(data);
    } catch (error) {
      setError(true)
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (error) {
    return null;
  }
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <IconHeading>Top Rated Movies</IconHeading>
      <CardSlider
        movies={movies}
        cardType="movie"
        moreBtnVsible={true}
        linkTo="/top-rated"
      />
    </div>
  );
}

export default HomeTopRated;
