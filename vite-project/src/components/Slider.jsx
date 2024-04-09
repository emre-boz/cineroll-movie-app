import { useEffect, useState, useRef, useMemo } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import "../styles/slider.css";
import LoadingAnimation from "./LoadingAnimation";
import SliderItem from "./SliderItem";
import ErrorFetch from "./ErrorFetch";

import {
  rightBtnIconDark,
  rightBtnIconLight,
  leftBtnIconDark,
  leftBtnIconLight,
} from "../assets/images";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderWindowRef = useRef(null);
  const sliderRef = useRef(null);

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderFirstTouch, setsliderFirstTouch] = useState(0);
  const [sliderWalk, setSliderWalk] = useState(0);
  const [sliderEndPosition, setSliderEndPosition] = useState(0);
  const [whileMoving, setWhileMoving] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [buttonDown, setButtonDown] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const existingClassName = "slider";
  const dynamicClassName = isActive ? "is-active" : "";
  const combinedClassName = `${existingClassName} ${dynamicClassName}`;

  function sliderResizer() {
    if (error !== null) {
      return;
    }
      const sliderWindow = sliderWindowRef.current;
      let ownSize = false;
      let sliderWindowWidthResponse;

      if (window.innerWidth > 1366) {
        sliderWindowWidthResponse = 80;
      } else {
        ownSize = true;
      }

      let sliderNewWidth = Math.floor(
        (window.innerWidth / 100) * sliderWindowWidthResponse
      );

      sliderWindow.style.width = ownSize ? "100%" : sliderNewWidth + "px";
  }

  function showSlide(index) {
    if (error !== null) {
      return;
    }
    const sliderWindow = sliderWindowRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    let targetPosition = -index * slideWidth;

    setPosition({ x: targetPosition, y: 0, z: 0 });

    setSliderEndPosition(targetPosition);

    setCurrentIndex(index);
  }

  const handleResize = () => {
    if (error !== null) {
      return;
    }
    setScreenWidth(window.innerWidth);
    sliderResizer();
    setIsActive(false);
    showSlide(currentIndex);
  };

  function leftButtonDown() {
    setButtonDown(true);
    const sliderWindow = sliderWindowRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    const slider = sliderRef.current;

    let translateXvalue = Math.round(
      slider.getBoundingClientRect().left -
        sliderWindow.getBoundingClientRect().left
    );

    let diff = translateXvalue % slideWidth;

    if (diff !== 0) {
      setWhileMoving(true);
    } else if (currentIndex == 0 && diff == 0) {
      setIsActive(false);
      setPosition({ x: -slideWidth * (movies.length - 2), y: 0, z: 0 });
      setCurrentIndex(movies.length - 2);
    }
  }
  function leftButtonUp() {
    setIsActive(true);

    if (buttonDown) {
      if (whileMoving) {
        showSlide(currentIndex);
        setWhileMoving(false);
      } else {
        showSlide(currentIndex - 1);
      }
    }
    setButtonDown(false);
    setWhileMoving(false);
  }

  function rightButtonDown() {
    setButtonDown(true);
    const sliderWindow = sliderWindowRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    const slider = sliderRef.current;

    let translateXvalue = Math.round(
      slider.getBoundingClientRect().left -
        sliderWindow.getBoundingClientRect().left
    );

    let diff = translateXvalue % slideWidth;

    if (diff !== 0) {
      setWhileMoving(true);
    } else if (currentIndex == movies.length - 1 && diff == 0) {
      setIsActive(false);
      setPosition({ x: -slideWidth, y: 0, z: 0 });
      setCurrentIndex(1);
    }
  }
  function rightButtonUp() {
    setIsActive(true);

    if (buttonDown) {
      if (whileMoving) {
        showSlide(currentIndex);
        setWhileMoving(false);
      } else {
        showSlide(currentIndex + 1);
      }
    }
    setButtonDown(false);
    setWhileMoving(false);
  }

  function startSliderDrag(e) {
    stopSlider();
    e.preventDefault();
    setDraggable(true);

    let xValue;
    let yValue;
    if (e.type === "touchstart") {
      xValue = e.touches[0].pageX;
      yValue = e.touches[0].pageY;
    } else if (e.type === "mousedown") {
      xValue = e.pageX;
    }
    const sliderWindow = sliderWindowRef.current;
    const slider = sliderRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    let translateXvalue = Math.round(
      slider.getBoundingClientRect().left -
        sliderWindow.getBoundingClientRect().left
    );

    if (translateXvalue % slideWidth !== -0) {
      setWhileMoving(true);
      setPosition({ x: translateXvalue, y: 0, z: 0 });
      setSliderEndPosition(translateXvalue);
    }

    setIsActive(false);
    setsliderFirstTouch(xValue);
  }

  function moveSlider(e) {
    e.preventDefault();

    let xValue;
    let yValue;
    if (e.type === "touchmove") {
      xValue = e.touches[0].pageX;
      yValue = e.touches[0].pageY;
    } else if (e.type === "mousemove") {
      xValue = e.pageX;
    }

    if (draggable) {
      setSliderWalk(xValue - sliderFirstTouch);

      const sliderWindow = sliderWindowRef.current;
      const slideWidth = sliderWindow.getBoundingClientRect().width;

      const slider = sliderRef.current;

      let translateXvalue = Math.round(
        slider.getBoundingClientRect().left -
          sliderWindow.getBoundingClientRect().left
      );

      if (translateXvalue >= 0) {
        setIsActive(false);
        setPosition({
          x: -slideWidth * (movies.length - 2) - sliderWalk,
          y: 0,
          z: 0,
        });
        setCurrentIndex(movies.length - 2);
        setSliderEndPosition(-slideWidth * (movies.length - 2) - sliderWalk);
      } else if (translateXvalue <= -slideWidth * (movies.length - 1)) {

        setPosition({ x: -slideWidth + -sliderWalk, y: 0, z: 0 });
        setSliderEndPosition(-slideWidth + -sliderWalk);
        setCurrentIndex(1);
      }

      setPosition({ x: sliderWalk + sliderEndPosition, y: 0, z: 0 });
    }
  }

  function endSliderDrag(e) {
    playSlider();
    setDraggable(false);
    setSliderEndPosition(sliderEndPosition + sliderWalk);
    setSliderWalk(0);
    setIsActive(true);

    if (sliderWalk == 0) {
      showSlide(currentIndex);
    } else if (whileMoving && sliderWalk < 0) {

      const sliderWindow = sliderWindowRef.current;
      const slider = sliderRef.current;
      const slideWidth = sliderWindow.getBoundingClientRect().width;
      let translateXvalue = Math.round(
        slider.getBoundingClientRect().left -
          sliderWindow.getBoundingClientRect().left
      );

      let targetIndex = Math.ceil(-translateXvalue / slideWidth);

      if (targetIndex < 0) {
        targetIndex = 0;
      } else if (targetIndex > movies.length - 1) {
        targetIndex = movies.length - 1;
      }

      showSlide(targetIndex);
      setWhileMoving(false);
    } else if (whileMoving && sliderWalk > 0) {

      const sliderWindow = sliderWindowRef.current;
      const slider = sliderRef.current;
      const slideWidth = sliderWindow.getBoundingClientRect().width;

      let translateXvalue = Math.round(
        slider.getBoundingClientRect().left -
          sliderWindow.getBoundingClientRect().left
      );

      if (translateXvalue % slideWidth == -0) {
        return;
      }

      let targetIndex = Math.ceil(-translateXvalue / slideWidth) - 1;

      if (targetIndex < 0) {
        targetIndex = 0;
      } else if (targetIndex > movies.length - 1) {
        targetIndex = movies.length - 1;
      }
      showSlide(targetIndex);
      setWhileMoving(false);
    } else if (sliderWalk > -50 && sliderWalk < 0) {
      showSlide(currentIndex);
    } else if (sliderWalk <= -50) {
      showSlide(currentIndex + 1);
    } else if (sliderWalk > 0 && sliderWalk <= 50) {
      showSlide(currentIndex);
    } else if (sliderWalk > 50) {
      setIsActive(true);
      showSlide(currentIndex - 1);
      setIsActive(true);
    }
  }
  function addPrefixToKey(originalKey, index) {
    const prefix = (index + 1).toString().padStart(2, "0");
    return `${prefix}_${originalKey}`;
  }

 
  const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(nowPlayingUrl);
      const data = await response.json();

      const movieDetailsPromises = data.results.map(async (movie) => {
        const singleMovieUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos,release_dates`;

        const movieDetailsResponse = await fetch(singleMovieUrl);
        const movieDetails = await movieDetailsResponse.json();
        return movieDetails;
      });

      const allMovieDetails = await Promise.all(movieDetailsPromises);
      let newResult = [...allMovieDetails];
      newResult.push(newResult[0]);
      newResult.unshift(newResult[newResult.length - 2]);

      const modifiedData = newResult.map((item, index) => ({
        ...item,
        id: addPrefixToKey(item.id, index),
      }));
      setMovies(modifiedData);
    } catch (error) {
      setError(true);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      sliderResizer();
      showSlide(1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    let intervalId;

    const startCounter = () => {
      intervalId = setInterval(() => {
        if (currentIndex === movies.length - 2) {
          setIsActive(false);
          showSlide(0);
        } else if (currentIndex === movies.length - 1) {
          setIsActive(false);
          showSlide(1);
        } else {
          setIsActive(true);
          showSlide(currentIndex + 1);
        }
      }, 6000);
    };

    if (!hovering && !isLoading && movies.length > 0) {
      startCounter();
    }

    return () => clearInterval(intervalId);
  }, [hovering, currentIndex, isLoading, movies]);

  const stopSlider = () => {
    setHovering(true);
  };

  const playSlider = () => {
    setHovering(false);
  };






  const memorizedItems = useMemo(() => {
    return movies.map((movie) => {
      return (
        <SliderItem
          key={movie.id}
          movie={movie}
          screenWidth={screenWidth}
          playSlider={playSlider}
          stopSlider={stopSlider}
        />
      );
    });
  }, [movies, screenWidth]);


  if (error) {
    return <ErrorFetch />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="slider-container">
          <button
            className="arrow-buttons"
            onMouseDown={leftButtonDown}
            onMouseUp={leftButtonUp}
            onMouseEnter={stopSlider}
            onMouseLeave={playSlider}
          >
            <img
              src={screenWidth > 1366 ? leftBtnIconDark : leftBtnIconLight}
              alt="left"
              className="arrow-button-image"
            />
          </button>
          <button
            className="arrow-buttons"
            onMouseDown={rightButtonDown}
            onMouseUp={rightButtonUp}
            onMouseEnter={stopSlider}
            onMouseLeave={playSlider}
          >
            <img
              src={screenWidth > 1366 ? rightBtnIconDark : rightBtnIconLight}
              alt="right"
              className="arrow-button-image"
            />
          </button>
          <div className="slider-window" ref={sliderWindowRef}>
            <div
              className={combinedClassName}
              ref={sliderRef}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
              }}
              onMouseDown={startSliderDrag}
              onMouseMove={moveSlider}
              onMouseUp={endSliderDrag}
              onMouseLeave={endSliderDrag}
              onTouchStart={startSliderDrag}
              onTouchMove={moveSlider}
              onTouchEnd={endSliderDrag}
            >
              {memorizedItems}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
