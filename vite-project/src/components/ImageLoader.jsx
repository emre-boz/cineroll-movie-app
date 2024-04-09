import { useEffect, useRef, useState } from "react";
import { imageLoaderIcon } from "../assets/images";
import "../styles/image-loader.css";
function ImageLoader({ src, alt, className, imageType, onClick, key }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current.complete) {
      setLoaded(true);
    } else {
      const handleLoad = () => {
        setLoaded(true);
      };
      const imgElement = imgRef.current;
      imgElement.addEventListener("load", handleLoad);
      return () => {
        imgElement.removeEventListener("load", handleLoad);
      };
    }
  }, [src]);

  return (
    <>
      {!loaded &&
        (imageType === "backdrop" ? (
          <div className={`${className} image-loader`}>
            <img
              src={imageLoaderIcon}
              alt="image-loader-icon"
              className="image-loader-icon"
            />
          </div>
        ) : (
          <div className={`${className} poster-loader`}>
            <img
              src={imageLoaderIcon}
              alt="image-loader-icon"
              className="image-loader-icon"
            />
          </div>
        ))}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        onClick={onClick}
        style={{ display: loaded ? "inline" : "none" }}
      />
    </>
  );
}

export default ImageLoader;
