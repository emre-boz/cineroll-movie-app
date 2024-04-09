import { Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/card-wide-person.css";
import ImageLoader from "./ImageLoader";
import { personPlaceholder } from "../assets/images";

function CardWidePerson({ person, cardType }) {
  return (
    <Link
      key={person.id}
      to={`/person/id/${person.id}`}
      className="card-person-wide"
    >
      <ImageLoader
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
            : personPlaceholder
        }
        alt={person.name}
        className="card-person-wide-image"
        imageType="poster"
      />
      <div className="card-person-wide-info">
        <h2>{person.name}</h2>
        <div>
          <span className="card-person-wide-department">
            {cardType == "search" && `${person.known_for_department} | `}
          </span>
          {cardType == "search" &&
            person.known_for.map((movie, index, array) => (
              <Fragment key={index}>
                <span className="card-person-wide-known-for">
                  {movie.title || movie.name}
                </span>
                {index !== array.length - 1 && <span className="dot"> · </span>}
              </Fragment>
            ))}
          {person.job && <p>{person.job}</p>}
          {person.character && <p>As {person.character}</p>}
        </div>
      </div>
    </Link>
  );
}

export default CardWidePerson;
