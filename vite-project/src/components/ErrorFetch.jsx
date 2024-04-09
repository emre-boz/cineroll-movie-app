import '../styles/error-fetch.css';
import ImageLoader from "./ImageLoader";
import { errorFetch } from "../assets/images";
function ErrorFetch() {
  return (
    <div className="error-fetch">
      <ImageLoader
        src={errorFetch}
        alt="error-fetch"
        className="error-fetch-image"
        imageType="poster"
      />
        <p className='error-fetch-info'>We're having some trouble at the moment. Please try again later.</p>
    </div>
  );
}

export default ErrorFetch;
