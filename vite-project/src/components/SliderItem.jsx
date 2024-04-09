import { useMemo } from "react";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";
import {
  shortenText,
  getCertification,
  setRuntime,
  getGenres,
  kebabCaseConverter
} from "./utils/utils";

function SliderItem({ movie, screenWidth, playSlider, stopSlider }) {
  const memorizerImage = useMemo(() => {
    return (
      movie && (
        <ImageLoader
          src={`https://image.tmdb.org/t/p/${
            screenWidth > 425 ? "w1280" : "w500"
          }${screenWidth > 425 ? movie.backdrop_path : movie.poster_path}`}
          alt={movie.original_title}
          className="slider-image"
          imageType="backdrop"
        />
      )
    );
  }, [movie, screenWidth]);

  return (
    <div className="item">
      {memorizerImage}
      <div className="slider-box">
        <div
          className="movie-info"
          onMouseEnter={stopSlider}
          onMouseLeave={playSlider}
        >
          <h3 className="movie-name">{shortenText(movie.title, 20)}</h3>

          <h4>
            <span className="age-restriction-light">
              {getCertification(movie)}
            </span>
            | {setRuntime(movie)} | {getGenres(movie)}
          </h4>
          <p className="overview">{shortenText(movie.overview, 90)}</p>
          <Link
            className="show-slider-goToPage-btn"
            to={`/movie/id/${movie.id.replace(/^.*_/, "")}`}
          >
            Go to Page
          </Link>
        </div>
        <button
          className="watch-now"
          onClick={() => {
            let link = `https://www.themoviedb.org/movie/${movie.id.slice(
              3
            )}-${kebabCaseConverter(movie.title)}/watch?`;
            window.open(link, "_blank");
          }}
        >
          WATCH NOW
        </button>
      </div>
    </div>
  );
}

export default SliderItem;
