import { useState, useEffect } from "react";
import "../styles/gridDisplay.css";
import Card from "./Card";
import CardWide from "./CardWide";

function GridDisplay({ movies }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="movies">
        {movies &&
          movies.map((movie) =>
            screenWidth < 700 ? (
              <CardWide movie={movie} />
            ) : (
              <Card movie={movie} allowClick={true} />
            )
          )}
      </div>
    </>
  );
}

export default GridDisplay;
