import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/profil-page.css";
import {
  CardSlider,
  LoadingAnimation,
  ImageLoader,
  IconHeading,
  ErrorFetch
} from "../components";
import { userAvatar, userBackground } from "../assets/images";
function Profil() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    userName: "Cinephilia",
    userRecentActivities: [
      792307, 508883, 706614, 443463, 766105, 206487, 46705, 475373, 496243,
      637,
    ],
    userFavorites: [
      70981, 339877, 254320, 360030, 2667, 9323, 33273, 1907, 10189, 160,
    ],
    userWatchLists: [872585, 792307, 68734, 467244],
  });

  const [movieDetails, setMovieDetails] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);

  const fetchMovieData = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  async function fetchMovies(movieIds, setState) {
    setIsLoading(true);
    try {
      const moviesData = await Promise.all(movieIds.map(fetchMovieData));
      setState(moviesData);
    } catch (error) {
      setError(error);

      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(user.userRecentActivities, setMovieDetails);
    fetchMovies(user.userFavorites, setFavoriteMovies);
    fetchMovies(user.userWatchLists, setWatchListMovies);
  }, []);

  if (error) {
    return <ErrorFetch />;
  }

  return (
    <>
      {isLoading && <LoadingAnimation />}

      <div className="profil-header">
        <div className="blur-background"></div>

        <ImageLoader
          src={userBackground}
          alt="profil_background"
          className="blur-background"
          imageType="poster"
        />
        <div className="profil-display">
          <ImageLoader
            src={userAvatar}
            alt="userAvatar"
            className="user-avatar"
            imageType="poster"
          />
          <div className="profil-info">
            <span className="user-name">{user.userName}</span>
            <div className="profil-stats">
              <div className="profil-stats-item">
                <span className="profil-stats-item-value">
                  {user.userFavorites.length}
                </span>
                <span className="profil-stats-item-title">Favorites</span>
              </div>
              <div className="profil-stats-item">
                <span className="profil-stats-item-value">
                  {user.userWatchLists.length}
                </span>
                <span className="profil-stats-item-title">Watchlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="user-items"></div>
      <div className="favorites">
        <IconHeading>My Favorites</IconHeading>

        <CardSlider
          movies={favoriteMovies}
          cardType="movie"
          moreBtnVsible={false}
        />
      </div>

      <div className="watchlist">
        <IconHeading>My Whatchlist</IconHeading>
        {watchListMovies.length > 0 ? (
          <CardSlider
            movies={watchListMovies}
            cardType="movie"
            moreBtnVsible={false}
          />
        ) : (
          <div>There is no country for old men</div>
        )}
      </div>
      <div className="recent-activities">
        <IconHeading>Recent Activies</IconHeading>

        <CardSlider
          movies={movieDetails}
          cardType="movie"
          moreBtnVsible={false}
        />
      </div>
    </>
  );
}

export default Profil;
