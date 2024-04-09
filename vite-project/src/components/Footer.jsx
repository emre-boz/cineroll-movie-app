import "../styles/footer.css";
import {
  tmdbAltLongBlue,
  facebookLight,
  instagramLight,
  twitterLight,
} from "../assets/images";

const Footer = () => {
  return (
    <footer>
      <div className="author">
        <a
          href="https://github.com/emre-boz/cineroll-movie-app"
          className="attribution-link"
        >
          Github Link
        </a>
      </div>
      <div className="tmdb-attribution">
        <img
          src={tmdbAltLongBlue}
          alt="tmdb-logo-alt-short-blue"
          className="tmdb-logo"
        />

        <p className="tmdb-attribution-info">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <a href="https://www.themoviedb.org" className="attribution-link">
          TMDB Link
        </a>
      </div>

      <div>
        Images made with{" "}
        <a href="https://openai.com/dall-e-2" className="attribution-link">
          Dall-E
        </a>{" "}
        - openai.com
      </div>
      <div>
        <a
          href="https://www.flaticon.com/free-icons/winner"
          title="winner icons"
          className="attribution-link"
        >
          Winner icons created by Good Ware - Flaticon
        </a>
      </div>
      <div>
        Icons made with{" "}
        <a href="https://fontawesome.com" className="attribution-link">
          Font Awesome Free
        </a>{" "}
        - fontawesome.com
      </div>

      <div>
        Loading Animation:
        <a
          href="https://lottiefiles.com/fv3lwt4ze9khh3av"
          className="attribution-link"
        >
          mohammed amhei
        </a>{" "}
        - LottieFiles.com
      </div>
      <div className="footer-bottom">
        <div className="footer-social-links">
          <a href="https://instagram.com">
            <img
              src={instagramLight}
              title="Instagram"
              alt="Instagram"
              className="footer-icon"
            />
          </a>
          <a href="https://facebook.com">
            <img
              src={facebookLight}
              title="Facebook"
              alt="Facebook"
              className="footer-icon"
            />
          </a>
          <a href="https://twitter.com">
            <img
              src={twitterLight}
              title="Twitter"
              alt="Twitter"
              className="footer-icon"
            />
          </a>
        </div>
        <div>
          <small>
            © Cineroll <span id="year">2024</span>, All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
