import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/cards-slider.css";
import Card from "./Card";
import CardCast from "./CardCast";

function CardSlider({ movies, cardType, moreBtnVsible, linkTo }) {
  const cardSliderWindowRef = useRef(null);
  const cardSliderRef = useRef(null);

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderFirstTouch, setsliderFirstTouch] = useState(0);
  const [sliderWalk, setSliderWalk] = useState(0);
  const [sliderEndPosition, setSliderEndPosition] = useState(0);
  const [whileMoving, setWhileMoving] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [triggerUnit, setTriggerUnit] = useState(0);
  const [allowClick, setAllowClick] = useState(false);

  const existingClassName = "cards";
  const dynamicClassName = isActive ? "is-active" : "";
  const combinedClassName = `${existingClassName} ${dynamicClassName}`;

  function sliderResizer() {
    if (window.innerWidth > 1024) {
      setTriggerUnit(50);
    } else if (window.innerWidth > 425 && window.innerWidth < 1024) {
      setTriggerUnit(20);
    } else {
      setTriggerUnit(10);
    }

    const sliderWindow = cardSliderWindowRef.current;

    let sliderWindowWidthResponse;
    if (window.innerWidth > 768) {
      sliderWindowWidthResponse = 80;
    } else {
      sliderWindowWidthResponse = 90;
    }

    let sliderNewWidth = Math.floor(
      (window.innerWidth / 100) * sliderWindowWidthResponse
    );
    sliderWindow.style.width = sliderNewWidth + "px";
  }

  function showSlide(index) {
    const sliderWindow = cardSliderWindowRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    const cardWidth =
      cardType === "people"
        ? 150
        : cardType === "movie"
        ? window.innerWidth > 768
          ? 200
          : 150
        : 0;

    let gapValue = 10;
    let realCardCount =
      (slideWidth * 0.9 + gapValue / 2) / (cardWidth + gapValue);

    let visibleCardCount =
      realCardCount % 1 > 0.85
        ? Math.ceil(realCardCount)
        : Math.floor(realCardCount);

    let leap = moreBtnVsible == true ? 1 : 0;

    let indexCount = Math.ceil((movies.length + leap) / visibleCardCount);

    if (index <= 0) {
      index = 0;
    } else if (index >= indexCount - 1) {
      index = indexCount - 1;
    }

    let cardDiff =
      index * ((slideWidth % cardWidth) - visibleCardCount * gapValue);

    let targetPosition = -index * (visibleCardCount * (cardWidth + gapValue));

    setPosition({ x: targetPosition, y: 0, z: 0 });

    setSliderEndPosition(targetPosition);

    setCurrentIndex(index);
  }
  const handleResize = () => {
    sliderResizer();
    setIsActive(false);
    showSlide(currentIndex);
  };
  function prevSlide() {
    setIsActive(true);
    showSlide(currentIndex - 1);
  }

  function nextSlide() {
    setIsActive(true);
    showSlide(currentIndex + 1);
  }

  function startSliderDrag(e) {
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
    const sliderWindow = cardSliderWindowRef.current;
    const slider = cardSliderRef.current;
    const slideWidth = sliderWindow.getBoundingClientRect().width;

    let translateXvalue = Math.round(
      slider.getBoundingClientRect().left -
        sliderWindow.getBoundingClientRect().left
    );

    const cardWidth =
      cardType === "people"
        ? 150
        : cardType === "movie"
        ? window.innerWidth > 768
          ? 200
          : 150
        : 0;

    let gapValue = 10;

    let realCardCount =
      (slideWidth * 0.9 + gapValue / 2) / (cardWidth + gapValue);

    let visibleCardCount =
      realCardCount % 1 > 0.85
        ? Math.ceil(realCardCount)
        : Math.floor(realCardCount);
    let cardDiff = -currentIndex * (visibleCardCount * (cardWidth + gapValue));

    if ((translateXvalue - cardDiff) % slideWidth !== -0) {
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
      setPosition({ x: sliderWalk + sliderEndPosition, y: 0, z: 0 });
    }
  }

  function endSliderDrag(e) {
    setAllowClick(false);
    setDraggable(false);
    setSliderEndPosition(sliderEndPosition + sliderWalk);
    setSliderWalk(0);
    setIsActive(true);

    if (sliderWalk == 0) {
      if (whileMoving == false) {
        setAllowClick(true);
      } else {
        showSlide(currentIndex);
      }
    } else if (whileMoving && sliderWalk < 0) {
      const sliderWindow = cardSliderWindowRef.current;
      const slider = cardSliderRef.current;
      const slideWidth = sliderWindow.getBoundingClientRect().width;

      let translateXvalue = Math.round(
        slider.getBoundingClientRect().left -
          sliderWindow.getBoundingClientRect().left
      );

      showSlide(Math.ceil(-translateXvalue / slideWidth));
      setWhileMoving(false);
    } else if (whileMoving && sliderWalk > 0) {
      const sliderWindow = cardSliderWindowRef.current;
      const slider = cardSliderRef.current;
      const slideWidth = sliderWindow.getBoundingClientRect().width;

      let translateXvalue = Math.round(
        slider.getBoundingClientRect().left -
          sliderWindow.getBoundingClientRect().left
      );

      if (translateXvalue % slideWidth == -0) {
        return;
      }
      showSlide(Math.ceil(-translateXvalue / slideWidth) - 1);
      setWhileMoving(false);
    } else if (sliderWalk > -triggerUnit && sliderWalk < 0) {
      showSlide(currentIndex);
    } else if (sliderWalk <= -triggerUnit) {
      nextSlide();
    } else if (sliderWalk > 0 && sliderWalk <= triggerUnit) {
      showSlide(currentIndex);
    } else if (sliderWalk > triggerUnit) {
      prevSlide();
    }
    setWhileMoving(false);
  }

  const memorizedCards = useMemo(() => {
    return movies.map((item, index) => {
      return cardType == "movie" ? (
        <Card
          key={index + "_" + item.id}
          movie={item}
          allowClick={allowClick}
          parent="slider"
        />
      ) : (
        <CardCast
          key={index + "_" + item.id}
          person={item}
          allowClick={allowClick}
        />
      );
    });
  }, [movies, cardType, allowClick]);

  useEffect(() => {
    sliderResizer();
    showSlide(0);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="cards-slider-container">
      <div className="cards-slider-window" ref={cardSliderWindowRef}>
        <div className="cards-dissolve"></div>
        <div className="cards-dissolve"></div>
        <div
          className={combinedClassName}
          ref={cardSliderRef}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
          }}
          onMouseDown={(e) => startSliderDrag(e)}
          onMouseMove={(e) => moveSlider(e)}
          onMouseUp={(e) => endSliderDrag(e)}
          onMouseLeave={(e) => endSliderDrag(e)}
          onTouchStart={(e) => startSliderDrag(e)}
          onTouchMove={(e) => moveSlider(e)}
          onTouchEnd={(e) => endSliderDrag(e)}
        >
          {memorizedCards}

          {moreBtnVsible && (
            <Link to={allowClick && linkTo} className="more-button">
              More...
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardSlider;
