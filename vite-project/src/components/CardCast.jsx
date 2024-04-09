import { Link } from "react-router-dom";
import "../styles/card-cast.css";
import ImageLoader from "./ImageLoader";
import { shortenText } from "./utils/utils";
import { personPlaceholder } from "../assets/images";


function CardCast({ person, allowClick }) {
  return (
    <Link
      to={`/person/id/${person.id}`}
      onClick={(e) => {
        if (!allowClick) {
          e.preventDefault();
        }
      }}
      className="card-cast-person"
    >
      <ImageLoader
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
            : personPlaceholder
        }
        alt={person.name}
        className="card-cast-person-image"
        imageType="poster"
      />
      <div className="card-cast-person-info">
        <h4>{shortenText(person.name, 15)}</h4>
        <p>{shortenText(person.character, 12)}</p>
      </div>
    </Link>
  );
}

export default CardCast;
