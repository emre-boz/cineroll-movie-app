import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/full-cast-crew-page.css";
import {
  CardWidePerson,
  IconHeading,
  AnimatedToggleButton,
  LoadingAnimation,
} from "../components";

function FullCastAndCrew() {

  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [castAndCrew, setCastAndCrew] = useState({ cast: [], crew: [] });
  const [displayItem, setDisplayItem] = useState(true);

  const extraData = location.state?.extraData;

  async function fetchMovieCredits(movieId) {
    setIsLoading(true);

    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCastAndCrew({ cast: data.cast, crew: data.crew });
    } catch (error) {
      console.error("Fetching movie credits failed:", error);
      setCastAndCrew({ cast: [], crew: [] });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!extraData) {
      fetchMovieCredits(id);
    } else {
      setCastAndCrew(extraData);
    }
  }, [id, extraData]);

  const departmentNames = [
    "Directing",
    "Writing",
    "Production",
    "Cinematography",
    "Art",
    "Sound",
    "Visual Effects",
    "Editing",
    "Costume",
    "Music",
    "Camera",
    "Lighting",
    "Crew",
  ];

  const departmentsAndPeople = departmentNames.map((departmentName) => ({
    departmentName,
    departmentPeople: castAndCrew.crew.filter(
      (person) => person.department === departmentName
    ),
  }));

  return (
    <>
      {isLoading && <LoadingAnimation />}

      <div className="full-cast-and-crew-page">
        <h1 className="page-heading">Full Cast & Crew</h1>

        <AnimatedToggleButton
          optionAname="Cast"
          optionBname="Crew"
          onClick={() => setDisplayItem(!displayItem)}
          displayItem={displayItem}
        />

        {displayItem && (
          <div className="full-cast">
            <div className="full-cast-people">
              {castAndCrew.cast.map((person) => (
                <CardWidePerson key={person.id} person={person} />
              ))}
            </div>
          </div>
        )}

        {!displayItem && (
          <div className="full-crew">
            {departmentsAndPeople.map((department, index) => (
              <div key={index}>
                <IconHeading>{department.departmentName}</IconHeading>

                <div className="full-crew-department-people">
                  {department.departmentPeople.length > 0 ? (
                    department.departmentPeople.map((person) => (
                      <CardWidePerson key={person.credit_id} person={person} />
                    ))
                  ) : (
                    <span className="regular-section">N/A</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FullCastAndCrew;
