import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import CardSlider from "./CardSlider";
import LoadingAnimation from "./LoadingAnimation";
import IconHeading from "./IconHeading";

function HomeUpcoming() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

  const fetchMovies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(upcomingUrl);
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
      <IconHeading>Upcoming Movies</IconHeading>
      <CardSlider movies={movies} cardType="movie" moreBtnVsible={false} />
    </div>
  );
}

export default HomeUpcoming;
