import { useState, useEffect, useRef, useMemo } from "react";
import "../styles/image-card-slider.css";
import Modal from "./Modal";
import ImageLoader from "./ImageLoader";

function ImageCardSlider({ images, imageWidth }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [sliderFirstTouch, setsliderFirstTouch] = useState(0);
  const [sliderWalk, setSliderWalk] = useState(0);
  const [sliderEndPosition, setSliderEndPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [shouldShowModal, setShouldShowModal] = useState(!draggable);

  const imageCardSliderWindowRef = useRef(null);
  const imageCardSliderRef = useRef(null);

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

    setsliderFirstTouch(xValue);
  }

  function moveSlider(e) {
    e.preventDefault();
    setShouldShowModal(false);
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

    setDraggable(false);

    const slider = imageCardSliderRef.current;
    const sliderTranslateXvalue = slider.style.transform;
    const translateXvalue = sliderTranslateXvalue.replace(
      /translate3d\((-?\d+(?:\.\d+)?).*/g,
      "$1"
    );
    if (sliderWalk == 0) {
      setShouldShowModal(true);
    } else if (translateXvalue >= 0) {
      setPosition({ x: 0, y: 0, z: 0 });
      setSliderEndPosition(0);
    } else if (translateXvalue <= -((images.length - 1) * imageWidth)) {
      if (images.length > 1) {
        setPosition({ x: -((images.length - 2) * imageWidth), y: 0, z: 0 });
        setSliderEndPosition(-((images.length - 2) * imageWidth));
      } else {
        setPosition({ x: 0, y: 0, z: 0 });
        setSliderEndPosition(0);
      }
    } else {
      setSliderEndPosition(sliderEndPosition + sliderWalk);
    }
    setSliderWalk(0);
  }

  const openModal = (image) => {
    if (shouldShowModal) {
      history.pushState({ modal: true }, "", "#modal");
      setIsOpen(true);
      setSelectedImage(image);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  };

  const memorizedImages = useMemo(() => {
    return images.map((image, index) => (
      <ImageLoader
        key={index}
        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
        alt={`Image ${index}`}
        className="image-card-slider-item"
        onClick={() => {
          openModal(image.file_path);
        }}
        imageType="poster"
      />
    ));
  }, [images, imageWidth, shouldShowModal]);

  useEffect(() => {
    setPosition({ x: -14, y: 0, z: 0 });
    setSliderEndPosition(-14);
  }, []);

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

  return (
    <div className="image-card-slider-container">
      <div className="image-card-slider-window" ref={imageCardSliderWindowRef}>
        <div className="cards-dissolve"></div>
        <div
          className="image-card-slider"
          ref={imageCardSliderRef}
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
          {memorizedImages}

          <div>
            <Modal isOpen={isOpen}>
              <div className="modal">
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  {selectedImage && (
                    <ImageLoader
                      src={`https://image.tmdb.org/t/p/w1280${selectedImage}`}
                      alt="Selected"
                      imageType="poster"
                      className="modal-content-image"
                    />
                  )}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCardSlider;
