import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HamburgerMenu.css";
import { bars, closeIconDark } from "../assets/images";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`menu-button ${isOpen ? "is-active" : ""}`}
        onClick={toggleMenu}
      >
        <img src={bars} alt="bars" />
      </div>

      <aside
        className={`sidebar ${isOpen ? "is-active" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-close">
          <img src={closeIconDark} alt="close" onClick={toggleMenu} />
        </div>
        <nav className="menu">
          <Link to="/" className="menu-item">
            HOME
          </Link>
          <Link to="trending" className="menu-item">
            Trending Movies
          </Link>
          <Link to="popular" className="menu-item">
            Popular Movies
          </Link>
          <Link to="top-rated" className="menu-item">
            Top Rated Movies
          </Link>
          <Link to="advanced-search" className="menu-item">
            Advanced Search
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default HamburgerMenu;
