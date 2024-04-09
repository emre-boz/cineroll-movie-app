import { useState } from "react";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

export function getDeviceType() {
  if (isMobile) return "Mobile";
  if (isTablet) return "Tablet";
  if (isDesktop) return "Desktop";
  return "Unknown"; 
}

export function shortenText(text, maxCharCount) {
  if (text.length <= maxCharCount) {
    return text;
  } else {

    return text.slice(0, maxCharCount) + "...";
  }
}

export function setRuntime(movie) {
  let runtime = parseInt(movie.runtime);
  return `${Math.floor(runtime / 60)}h ${runtime % 60}min`;
}

export function getGenres(movie) {
  const genres = movie.genres.slice(0, 3);
  let genresText = "";
  for (let i = 0; i < genres.length; i++) {
    let genresName =
      genres[i].name == "Science Fiction" ? "Sci-Fi" : genres[i].name;
    let genresItem = i == genres.length - 1 ? genresName : genresName + ", ";
    genresText = genresText + genresItem;
  }
  return genresText;
}

export function kebabCaseConverter(name) {
  name = name.toLocaleLowerCase();
  name = name.replace(" ", "-");
  return name;
}

export function formatBudget(budget) {
  if (!budget) {
    return "N/A";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(budget);
}

export function calculateAge(birthDateString, deathDateString = null) {
  const birthDate = new Date(birthDateString);
  const endDate = deathDateString ? new Date(deathDateString) : new Date();
  let age = endDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = endDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && endDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const birthDate = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(birthDate);
}

export function usePreventClickOnTextSelection() {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMouseDown = () => setIsSelecting(false);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    setIsSelecting(selection.toString().length > 0);
  };

  return { isSelecting, handleMouseDown, handleMouseUp };
}

export function handleMiddleClick(event, itemId) {
  event.preventDefault(event);
  if (event.button === 1) {
    window.open(window.location.origin + `/movie/id/${itemId}`, "_blank");
    window.focus();
  }
}

export function getCertification(movie) {
  if (movie && movie.release_dates && movie.release_dates.results) {
    const usRelease = movie.release_dates.results.find(
      (item) => item.iso_3166_1 === "US"
    );
    if (usRelease && usRelease.release_dates) {
      const certification = usRelease.release_dates.find(
        (item) => item.certification !== ""
      )?.certification;
      return certification ? certification : "N/A";
    }
  }
  return "N/A";
}
