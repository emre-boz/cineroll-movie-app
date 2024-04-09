import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import CardSlider from "./CardSlider";
import LoadingAnimation from "./LoadingAnimation";
import IconHeading from "./IconHeading";

function HomePopular() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function divideAndSwapArray(arr) {
    // Popular and upcoming movies were shuffled because they were too similar and negatively impacted the appearance of the main page.
    
    const length = arr.length;
    if (length % 2 !== 0) {
      const firstElement = arr.shift();
      arr.push(firstElement);
    }

    const middleIndex = Math.floor(length / 2);
    const firstHalf = arr.slice(0, middleIndex);
    const secondHalf = arr.slice(middleIndex);

    const swappedArray = [...secondHalf, ...firstHalf];

    return swappedArray;
  }


  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  const catchMovies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(popularUrl);
      const responseJson = await response.json();

      let data = responseJson.results;
      let dataShuffeled = divideAndSwapArray(data);
      setMovies(dataShuffeled);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    catchMovies();
  }, []);

  if (error) {
    return null;
  }
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <IconHeading>Popular Movies</IconHeading>

      <CardSlider
        movies={movies}
        cardType="movie"
        moreBtnVsible={true}
        linkTo="/popular"
      />
    </div>
  );
}

export default HomePopular;
