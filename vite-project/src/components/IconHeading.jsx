import {
  headIcon
} from "../assets/images";

function IconHeading({children}) {
  return (
    <div className="card-slider-head">
      <img src={headIcon} alt="head-icon" />
      <h2>{children}</h2>
    </div>
  );
}

export default IconHeading;
