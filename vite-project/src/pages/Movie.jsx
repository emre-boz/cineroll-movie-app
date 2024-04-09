import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/movie-page.css";
import {
  CardSlider,
  ImageCardSlider,
  IconHeading,
  Modal,
  VideoCardSlider,
  VideoCardSlide,
  LoadingAnimation,
  ImageLoader,
  Links,
  HeadPeople,
  MovieUserActions,
  ErrorFetch,
} from "../components";
import languageCodesJSON from "../assets/data/languageCodes.json";
import {
  getCertification,
  formatBudget,
  getGenres,
  setRuntime,
} from "../components/utils/utils.js";
import {
  posterPlaceholder,
  backdropPlaceholder,
  playIconDark,
  openLinkIcon,
} from "../assets/images";

function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productionCompanies, setProductionCompanies] = useState([]);
  const [linksData, setLinksData] = useState([]);
  const [images, setImages] = useState([]);
  const [people, setPeople] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [trailerId, setTrailerId] = useState(null);
  const [selectedVideo, setselectedVideo] = useState(null);

  function filterTrailers(arr) {
    return arr.filter((item) => item.type === "Trailer");
  }

  const languageCodes = languageCodesJSON;

  const getLanguageName = (code) => {
    return languageCodes[code] || code;
  };

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,images,release_dates,credits,external_ids`;

  async function fetchMovie() {
    setIsLoading(true);
    try {
      const response = await fetch(url);

      const data = await response.json();
      if (data.success == false) {
        alert(data.status_message);
      }
      setMovie(data);
      setPeople(data.credits);
      const trailerKey = filterTrailers(data.videos.results)[0]?.key;
      setTrailerId(trailerKey);
      setProductionCompanies(data.production_companies);
      setImages(data.images.backdrops);
      setLinksData(data.external_ids);
    } catch (error) {
      setError(error);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }
  const openModal = (video) => {
    history.pushState({ modal: true }, "", "#modal");
    setIsOpen(true);
    setselectedVideo(video);
  };

  const closeModal = () => {
    setIsOpen(false);
    setselectedVideo(null);
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
    fetchMovie();
  }, [id]);


  if (error) {
    return <ErrorFetch />;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div className="movie-page-header">
        <ImageLoader
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
              : backdropPlaceholder
          }
          alt={movie.name}
          className="movie-page-backdrop"
          imageType="poster"
        />

        <div className="movie-page-movie-poster-info">
          <ImageLoader
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : posterPlaceholder
            }
            alt={movie.id}
            className="movie-page-movie-poster"
            imageType="poster"
          />
          <div className="movie-page-movie-info">
            <div className="movie-page-movie-title">
              <h2>{movie.title + ` (${movie.release_date.slice(0, 4)})`} </h2>
              <span className="movie-page-movie-original-title">
                <b>Original Title:</b> {movie.original_title}
              </span>
            </div>

            <h4>
              <span className="age-restriction">{getCertification(movie)}</span>
              | {setRuntime(movie)} | {getGenres(movie)}
            </h4>

            {trailerId && (
              <div
                className="movie-page-play-trailer"
                onClick={() => {
                  openModal(trailerId);
                }}
              >
                <img
                  src={playIconDark}
                  alt="play-icon-dark"
                  className="play-trailer-icon"
                />
                <span>Play Trailer</span>
              </div>
            )}

            <div className="movie-page-movie-description-people-ratings">
              <div className="movie-page-movie-description-people">
                <p className="movie-page-movie-description">{movie.overview}</p>
                <div className="movie-page-movie-people">
                  <HeadPeople
                    title="Director"
                    people={people.crew.filter(
                      (member) => member.job === "Director"
                    )}
                  />

                  <HeadPeople
                    title="Writers"
                    people={people.crew
                      .filter((member) => member.department === "Writing")
                      .slice(0, 3)}
                  />
                  <HeadPeople title="Stars" people={people.cast.slice(0, 3)} />
                </div>
              </div>

              <MovieUserActions movie={movie} />
            </div>
          </div>
        </div>
      </div>
      <h3 className="movie-page-links-header">Movie Links</h3>

      <Links linksData={linksData} homePage={movie.homepage} />

      <div className="cast">
        <IconHeading>Cast</IconHeading>
        {people.cast.length > 0 ? (
          <CardSlider
            movies={people.cast.slice(0, 12)}
            cardType={"people"}
            moreBtnVsible={true}
            linkTo={{
              pathname: `/movie/id/${movie.id}/cast-crew`,
              state: { extraData: people },
            }}
          />
        ) : (
          <div className="regular-section">N/A</div>
        )}
      </div>
      <Link
        to={{
          pathname: `/movie/id/${movie.id}/cast-crew`,
          state: { extraData: people },
        }}
        className="full-cast-btn"
      >
        <span>Full Cast & Crew</span>
        <img
          src={openLinkIcon}
          alt="open-link-icon"
          className="full-cast-btn-icon"
        />
      </Link>

      <div className="images">
        <IconHeading>Images {images.length}</IconHeading>
        {images.length > 0 ? (
          <ImageCardSlider images={images} imageWidth={260} />
        ) : (
          <h2 style={{ textAlign: "center" }}>No Image Avaliable</h2>
        )}
      </div>

      <div className="movie-page-videos">
        <IconHeading>Videos {movie.videos.results.length}</IconHeading>
        {movie.videos.results.length > 0 ? (
          <VideoCardSlider videos={movie.videos.results} videoWidth={260} />
        ) : (
          <h2 style={{ textAlign: "center" }}>No Video Avaliable</h2>
        )}

        <div className="movie-page-video"></div>
      </div>

      <IconHeading>More Info</IconHeading>

      <div className="movie-page-language-badget-revenue">
        <div className="original-language">
          <h4>Original Language</h4>
          <p>{getLanguageName(movie.original_language)}</p>
        </div>
        <div className="budget">
          <h4>Budget</h4>
          <p>{formatBudget(movie.budget)}</p>
        </div>
        <div className="budget">
          <h4>Revenue</h4>
          <p>{formatBudget(movie.revenue)}</p>
        </div>
      </div>

      <div className="movie-page-production-companies">
        <h3>Production Companies</h3>

        <div className="movie-page-production-companies-list">
          {productionCompanies.length > 0 ? (
            productionCompanies.map((company) => (
              <div key={company.id}>
                {company.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={`${company.name} Logo`}
                    style={{ width: 100 }}
                  />
                ) : (
                  <span>{company.name}</span>
                )}
              </div>
            ))
          ) : (
            <div className="regular-section">N/A</div>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div
          className="modal-content-video"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {selectedVideo && <VideoCardSlide videoId={selectedVideo} />}
        </div>
      </Modal>
    </>
  );
}
export default Movie;
