import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/dropdown.css";
import "../styles/person-page.css";
import {
  LoadingAnimation,
  CardSlider,
  ImageCardSlider,
  IconHeading,
  ImageLoader,
  Links,
  ErrorFetch,
} from "../components";
import {
  shortenText,
  usePreventClickOnTextSelection,
  calculateAge,
  formatDate,
} from "../components/utils/utils.js";
import {
  posterPlaceholder,
  personPlaceholder,
  angleDown,
} from "../assets/images";

function Person() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [person, setPerson] = useState([]);
  const [knownForMovies, setKnownForMovies] = useState([]);
  const [personDepartments, setPersonDepartments] = useState(null);
  const [linksData, setLinksData] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const { isSelecting, handleMouseDown, handleMouseUp } =
    usePreventClickOnTextSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    departmentName: "choose",
    departmentItems: [""],
  });

  const personUrl = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US&append_to_response=movie_credits,images,external_ids`;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  function genderToEnglish(genderNumber) {
    const genderDict = {
      0: "Not specified",
      1: "Female",
      2: "Male",
      3: "Non-binary",
    };

    return genderDict[genderNumber] || "Unknown";
  }

  const fetchPerson = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(personUrl);
      const data = await response.json();

      if (data.success == false) {
        alert(data.status_message);
      }
      setPerson(data);
      setLinksData(data.external_ids);

      if (data.known_for_department == "Acting") {
        const topMovies = [...data.movie_credits.cast]
          .map((movie) => ({
            ...movie,
            score: movie.vote_count * movie.vote_average,
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 18);

        Promise.all(
          topMovies.map((movie) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
            )
              .then((response) => response.json())
              .then((credits) => {
                const index = credits.cast.findIndex(
                  (person) => person.name === data.name
                );
                return { ...movie, topThree: index >= 0 && index < 3 };
              })
          )
        ).then((moviesWithRank) => {
          const sortedMovies = moviesWithRank.sort((a, b) => {
            if (a.topThree && !b.topThree) return -1;
            if (!a.topThree && b.topThree) return 1;
            return b.vote_count - a.vote_count;
          });
          setKnownForMovies(sortedMovies);
        });
      } else {
        let idsCorrected = data.movie_credits.crew.filter(
          (item, index, array) => {
            return array.findIndex((i) => i.id === item.id) === index;
          }
        );
        setKnownForMovies(
          idsCorrected.sort((a, b) => b.vote_count - a.vote_count)
        );
      }

      const departments = [
        { departmentName: "Acting", departmentItems: data.movie_credits.cast },
        { departmentName: "Directing", departmentItems: [] },
        { departmentName: "Writing", departmentItems: [] },
        { departmentName: "Production", departmentItems: [] },
        { departmentName: "Cinematography", departmentItems: [] },
        { departmentName: "Art", departmentItems: [] },
        { departmentName: "Sound", departmentItems: [] },
        { departmentName: "Visual Effects", departmentItems: [] },
        { departmentName: "Editing", departmentItems: [] },
        { departmentName: "Costume", departmentItems: [] },
        { departmentName: "Music", departmentItems: [] },
        { departmentName: "Camera", departmentItems: [] },
        { departmentName: "Lighting", departmentItems: [] },
        { departmentName: "Crew", departmentItems: [] },
      ];

      data.movie_credits.crew.forEach((crewMember) => {
        let department = departments.find(
          (d) =>
            d.departmentName === crewMember.department ||
            (d.departmentName === "Acting" &&
              crewMember.department === "Actors")
        );

        if (department) {
          department.departmentItems.push(crewMember);
        }
      });

      const options = departments.filter(
        (item) => item.departmentItems.length > 0
      );

      setPersonDepartments(options);

      const defaultOption = options.filter(
        (department) => department.departmentName == data.known_for_department
      )[0];
      setSelectedItem(defaultOption);
    } catch (error) {
      setError(error);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, [id]);

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return <ErrorFetch />;
  }
  return (
    <>
      <div className="person-page-header">
        <div className="person-page-profil-photo-info">
          <ImageLoader
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w1280${person.profile_path}`
                : personPlaceholder
            }
            alt="profile-image"
            className="person-page-profil-photo"
            imageType="poster"
          />

          <div className="person-info">
            <h1>{person.name}</h1>
            <h3>Known For</h3>
            <span>{person.known_for_department}</span>
            <h3>Gender</h3>
            <span>{genderToEnglish(person.gender)}</span>
            <h3>Birthday</h3>
            <span>{person.birthday ? formatDate(person.birthday) : "-"} </span>
            <span>
              {person.deathday == null
                ? `(${calculateAge(person.birthday)} years old)`
                : ""}
            </span>

            {person.deathday && (
              <>
                <h3>Day of Death</h3>
                <span>
                  {formatDate(person.deathday) +
                    ` (${calculateAge(
                      person.birthday,
                      person.deathday
                    )} years old)`}
                </span>
              </>
            )}

            <h3>Place of Birth</h3>
            <span>
              {person.place_of_birth ? person.place_of_birth : <span>N/A</span>}
            </span>
          </div>
        </div>
        <div>
          {showFullText ? person.biography : shortenText(person.biography, 300)}
          {person.biography.length > 300 && (
            <button
              className="read-more-btn"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <Links linksData={linksData} homePage={person.homepage} />
      </div>
      <div></div>
      <div className="knowForMovies">
        <IconHeading>Known For</IconHeading>

        <CardSlider
          movies={knownForMovies.slice(0, 12)}
          cardType="movie"
          moreBtnVsible={false}
        />
      </div>
      <IconHeading>Profile Images</IconHeading>
      {person.images.profiles.length > 0 ? (
        <ImageCardSlider images={person.images.profiles} imageWidth={200} />
      ) : (
        <span className="regular-section">N/A</span>
      )}

      <div className="person-page-credits-header">
        <IconHeading>Credits</IconHeading>
        <div className="dropdown">
          <div className="dropdown-selected" onClick={toggleDropdown}>
            {selectedItem.departmentName +
              ` (${selectedItem.departmentItems.length})`}
            <img
              src={angleDown}
              alt="angle-down"
              className="dropdown-selected-icon"
            />
          </div>
          {isOpen && (
            <div className="dropdown-content">
              {personDepartments.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  {item.departmentName} ({item.departmentItems.length})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="person-page-department-items">
        {selectedItem.departmentItems
          .slice()
          .sort((a, b) => {
            if (!a.release_date) return -1;
            if (!b.release_date) return 1;

            return b.release_date.localeCompare(a.release_date);
          })
          .map((item) => (
            <Link
              key={item.id}
              to={!isSelecting && `/movie/id/${item.id}`}
              className="person-page-department-item"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <p>
                {item.release_date ? item.release_date.substring(0, 4) : "-"}
              </p>

              {item.release_date && (
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                      : posterPlaceholder
                  }
                  alt={item.title}
                  className="person-page-department-item-image"
                />
              )}

              <div className="person-page-department-item-info">
                <h4>{item.title}</h4>
                <p>
                  {selectedItem.departmentName == "Acting"
                    ? `as ${item.character}`
                    : item.job}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default Person;
