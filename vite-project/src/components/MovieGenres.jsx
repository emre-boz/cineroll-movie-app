import { useEffect, useState } from "react";

function MovieGenres({ title, formElementsCombiner }) {
  const genresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((item) => item !== id)
      );
    } else {
      setSelectedGenres((prevGenres) => [...prevGenres, id]);
    }
  };
  useEffect(() => {
    formElementsCombiner(false, "with_genres", selectedGenres);
  }, [selectedGenres]);
  return (
    <div className="filter-section" name="genres">
      <h4 className="filter-section-title">{title}</h4>
      {genresList.map((genre) => (
        <div
          className={`filter-genre-item ${
            selectedGenres.includes(genre.id) ? "active" : ""
          }`}
          key={genre.id}
          onClick={() => toggleGenre(genre.id)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
}

export default MovieGenres;
