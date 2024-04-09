import { useState, useEffect, useRef, useMemo } from "react";
import "../styles/video-card-slider.css";
import Modal from "./Modal";
import VideoCardSlide from "./VideoCardSlide";
import ImageLoader from "./ImageLoader";
import { shortenText } from "./utils/utils";
import { playIcon } from "../assets/images";

function VideoCardSlider({ videos, videoWidth }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const [sliderFirstTouch, setsliderFirstTouch] = useState(0);
  const [sliderWalk, setSliderWalk] = useState(0);
  const [sliderEndPosition, setSliderEndPosition] = useState(0);
  const [whileMoving, setWhileMoving] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [shouldShowModal, setShouldShowModal] = useState(!draggable);

  const videoCardSliderWindowRef = useRef(null);
  const videoCardSliderRef = useRef(null);

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

    const slider = videoCardSliderRef.current;
    const sliderTranslateXvalue = slider.style.transform;
    const translateXvalue = sliderTranslateXvalue.replace(
      /translate3d\((-?\d+(?:\.\d+)?).*/g,
      "$1"
    );

    if (draggable) {
      setSliderWalk(xValue - sliderFirstTouch);
      setPosition({ x: sliderWalk + sliderEndPosition, y: 0, z: 0 });
    }
  }

  function endSliderDrag(e) {
    setDraggable(false);
    setSliderEndPosition(sliderEndPosition + sliderWalk);
    if (sliderWalk == 0) {
      setShouldShowModal(true);
    }
    const slider = videoCardSliderRef.current;
    const sliderTranslateXvalue = slider.style.transform;
    const translateXvalue = sliderTranslateXvalue.replace(
      /translate3d\((-?\d+(?:\.\d+)?).*/g,
      "$1"
    );
    if (translateXvalue >= 0) {
      setPosition({ x: 0, y: 0, z: 0 });
      setSliderEndPosition(0);
    } else if (translateXvalue <= -((videos.length - 1) * videoWidth)) {
      if (videos.length > 1) {
        setPosition({ x: -((videos.length - 2) * videoWidth), y: 0, z: 0 });
        setSliderEndPosition(-((videos.length - 2) * videoWidth));
      } else {
        setPosition({ x: 0, y: 0, z: 0 });
        setSliderEndPosition(0);
      }
    }

    setSliderWalk(0);
    setWhileMoving(false);
  }

  const openModal = (video) => {
    if (shouldShowModal) {
      history.pushState({ modal: true }, "", "#modal");
      setIsOpen(true);
      setselectedVideo(video);
    }
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

  const memorizedVideos = useMemo(() => {
    return videos.map((video, index) => (
      <div
        className="video-card-slider-item"
        key={video.key}
        data-name={video.name}
      >
        <div className="video-card-slider-item-name">
          {shortenText(video.name, 16)}
        </div>
        <img src={playIcon} alt="play-icon" className="video-card-play-icon" />

        <ImageLoader
          key={index}
          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
          alt={`video ${index}`}
          className="video-card-slider-thumbnail"
          onClick={() => {
            openModal(video.key);
          }}
          imageType="poster"
        />
      </div>
    ));
  }, [videos, videoWidth, shouldShowModal]);

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
    <div className="video-card-slider-container">
      <div className="video-card-slider-window" ref={videoCardSliderWindowRef}>
        <div className="cards-dissolve"></div>
        <div
          className="video-card-slider"
          ref={videoCardSliderRef}
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
          {memorizedVideos}
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCardSlider;
