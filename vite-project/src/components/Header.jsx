import { createContext, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import SearchInput from "./SearchInput";
import HamburgerMenu from "./HamburgerMenu";
import {
  cinerollLogo,
  profilIcon,
  searchIconDark,
  searchIconLight,
  closeIconLight,
} from "../assets/images";
import { getDeviceType } from "./utils/utils";

export const DataContext = createContext();

function Header() {
  const [deviceType, setDeviceType] = useState(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [resultBox, setResultBox] = useState(true);

  const toggleMobileSearch = () => {
    setIsMobileSearch(!isMobileSearch);
  };
  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);
  return (
    <>
      <header>
        <nav>
          <Link
            to="/"
            className="logo-area"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            <img
              src={cinerollLogo}
              alt="cineroll-logo"
              className="logo-area-icon"
            />
          </Link>

          <DataContext.Provider
            value={{
              searchTerm,
              setSearchTerm,
              resultBox,
              setResultBox,
              inputValue,
              setInputValue,
            }}
          >
            <div className={`search-area ${isMobileSearch ? "is-active" : ""}`}>
              <SearchInput />

              <Link
                to={searchTerm && `/search/query/${searchTerm}`}
                className="search-icon-box"
                onClick={() => {
                  setResultBox(false);
                  setSearchTerm("");
                }}
              >
                <img src={searchIconDark} alt="searchiconDark" />
              </Link>
            </div>
          </DataContext.Provider>

          <div className="header-buttons">
            <button
              className={`search-button ${isMobileSearch ? "is-active" : ""}`}
              onClick={toggleMobileSearch}
            >
              <img
                src={isMobileSearch ? closeIconLight : searchIconLight}
                alt="searchiconlight"
              />
            </button>
            <Link
              to="/user"
              className="user-button"
              onMouseEnter={() =>  deviceType=="Desktop"&&setTooltipVisible(true)}
              onMouseLeave={() => deviceType=="Desktop"&&setTooltipVisible(false)}
            >
              <img src={profilIcon} alt="user-icon" className="user-icon" />
              {isTooltipVisible && (
                <div className="tooltip">View User Profil</div>
              )}
            </Link>
            <HamburgerMenu />
          </div>
        </nav>
      </header>
    </>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
export default Header;
