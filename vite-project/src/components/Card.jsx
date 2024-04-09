import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";
import { getDeviceType, shortenText } from "./utils/utils";
import { posterPlaceholder, returnIcon } from "../assets/images";

function Card({ movie, allowClick }) {
  const [isInfo, setIsInfo] = useState(false);
  const [deviceType, setDeviceType] = useState(null);
  const [titleLength, setTitleLength] = useState(19);

  const toggleInfo = () => {
    setIsInfo(false);
  };

  const handleMouseOver = () => {
    setIsInfo(true);
  };

  const handleMouseLeave = () => {
    setIsInfo(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setTitleLength(15);
      } else {
        setTitleLength(19);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);

  return (
    <div
      className="card"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <ImageLoader
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : posterPlaceholder
        }
        alt={movie.title}
        className="card-image"
        imageType="poster"
      />
      <div className="card-title">{shortenText(movie.title, titleLength)}</div>

      <div className={`card-info ${isInfo ? "visible" : ""}`}>
        <p>{shortenText(movie.overview, 200)}</p>

        <Link
          to={`/movie/id/${movie.id}`}
          className="go-btn"
          onClick={(e) => {
            if (!allowClick) {
              e.preventDefault();
            }
          }}
        >
          Go to Page
        </Link>

        {deviceType !== "Desktop" && (
          <button className="back-btn" onClick={toggleInfo}>
            <img src={returnIcon} alt="return" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
