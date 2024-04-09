import { Link } from "react-router-dom";
import "../styles/card-wide.css";
import ImageLoader from "./ImageLoader";
import { shortenText } from "./utils/utils";
import { posterPlaceholder } from "../assets/images";

function CardWide({ movie }) {
  return (
    <div className="card-wide" key={movie.id}>
      <ImageLoader
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
            : posterPlaceholder
        }
        alt={movie.title}
        className="card-wide-image"
        imageType="poster"
      />

      <div className="card-wide-info">
        <h3>{shortenText(movie.title, 30)}</h3>
        <p>{shortenText(movie.overview, 80)}</p>
        <Link to={`/movie/id/${movie.id}`} className="card-wide-go-btn">
          Go to Page
        </Link>
      </div>
    </div>
  );
}

export default CardWide;
