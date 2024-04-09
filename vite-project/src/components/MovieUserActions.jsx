import { useState, useEffect } from "react";
import "../styles/movie-user-actions.css";
import Modal from "./Modal";
import UserAction from "./UserAction";

import {
  heartIcon,
  heartRegularIcon,
  bookmarkRegularIcon,
  bookmarkSolidIcon,
  starIcon,
  starSolidIcon,
  ratingIcon,
  watchNowIcon,
} from "../assets/images";
import { getDeviceType, kebabCaseConverter, shortenText } from "./utils/utils";

function MovieUserActions({ movie }) {
  const [deviceType, setDeviceType] = useState(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [removable, setRemovable] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userRate, setUserRate] = useState(null);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    if (selectedIndex === null) {
      setHoverIndex(null);
    }
  };

  const handleClick = (index) => {
    setSelectedIndex(index);
  };


  const openModal = (action) => {
    history.pushState({ modal: true }, "", "#modal");
    setIsOpen(true);
    setSelectedAction(action);
  };

  const closeModal = () => {
    if (userRate == null) {
      setSelectedIndex(null);
    }
    setIsOpen(false);
    setSelectedAction(null);
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (isOpen) {
        event.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);
  return (
    <>
      {" "}
      <div className="movie-user-actions">
        <div
          className="movie-rating-icon"
          onMouseEnter={() => deviceType == "Desktop" && setTooltipVisible(true)}
          onMouseLeave={() => deviceType == "Desktop" && setTooltipVisible(false)}
        >
          <img
            src={ratingIcon}
            alt="rating-icon"
            className="movie-rating-icon-image"
          />
          <span className="movie-rating-icon-value">
            {Math.round(movie.vote_average * 10) / 10}
          </span>

          {isTooltipVisible && <div className="tooltip">User Score</div>}
        </div>

        <UserAction
          deviceType={deviceType}
          icon={heartRegularIcon}
          activeIcon={heartIcon}
          actionDescription="Mark as Favorites"
          id="favorites"
        />

        <UserAction
          deviceType={deviceType}
          icon={userRate ? starSolidIcon : starIcon}
          activeIcon={userRate ? starSolidIcon : starIcon}
          actionDescription="Rate it!"
          id="rate-btn"
          onClick={() => {
            setTimeout(() => {
              openModal("rate");
            }, 400);
          }}
        />

        <UserAction
          deviceType={deviceType}
          icon={bookmarkRegularIcon}
          activeIcon={bookmarkSolidIcon}
          actionDescription="Add to Watchlist"
          id="watch-list"
        />
        <UserAction
          deviceType={deviceType}
          icon={watchNowIcon}
          activeIcon={watchNowIcon}
          actionDescription="Watch"
          id="watch"
          onClick={() => {
            let link = `https://www.themoviedb.org/movie/${
              movie.id
            }-${kebabCaseConverter(movie.title)}/watch?`;
            window.open(link, "_blank");
          }}
        />
      </div>
      <Modal isOpen={isOpen}>
        <div
          className="modal-content-action"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedAction == "rate" && (
            <div className="modal-content-rate">
              <span className="modal-content-rate-close" onClick={closeModal}>
                &times;
              </span>
              <h3>{movie.title.length>31 ? shortenText(movie.title, 30) : movie.title}</h3>
              <div className="movie-rating-icon">
                <img
                  src={ratingIcon}
                  alt="rating-icon"
                  className="movie-rating-icon-image"
                />
                <span className="movie-rating-icon-value">

                  {userRate == null
                    ? selectedIndex !== null
                      ? selectedIndex + 1
                      : "0"
                    : userRate}
                </span>
              </div>

              <div className="rate-stars">
                {Array.from({ length: 10 }, (_, index) => (
                  <img
                    key={index}
                    src={
                      (hoverIndex != null && index <= hoverIndex) ||
                      (selectedIndex != null && index <= selectedIndex)
                        ? starSolidIcon
                        : starIcon
                    }
                    alt="star-icon"
                    className="rate-stars-star"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </div>
              <button
                className="rate-btn"
                onClick={() => {
                  if (removable == false) {
                    setUserRate(selectedIndex + 1);
                    setRemovable(true);
                    closeModal();
                  } else {
                    setRemovable(false);
                    setUserRate(null);
                    setSelectedIndex(null);
                  }
                }}
              >
                {removable ? "Remove Rate" : "Rate"}
              </button>
            </div>
          )}

        </div>
      </Modal>
    </>
  );
}

export default MovieUserActions;
