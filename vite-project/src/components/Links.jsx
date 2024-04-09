import { useState } from "react";
import "../styles/links.css";
import {
  facebook,
  imdb,
  instagram,
  twitter,
  linkIcon,
} from "../assets/images";
function Links({linksData,homePage}) {

  const [links, setLinks] = useState([
    {
      id: "facebook",
      logo: facebook,
      url: linksData.facebook_id
        ? `https://www.facebook.com/${linksData.facebook_id}`
        : null,
    },
    {
      id: "instagram",
      logo: instagram,
      url: linksData.instagram_id
        ? `https://www.instagram.com/${linksData.instagram_id}`
        : null,
    },
    {
      id: "twitter",
      logo: twitter,
      url: linksData.twitter_id
        ? `https://twitter.com/${linksData.twitter_id}`
        : null,
    },
    {
      id: "imdb",
      logo: imdb,
      url: linksData.imdb_id
        ? `https://www.imdb.com/title/${linksData.imdb_id}`
        : null,
    },
    {
      id: "homepage",
      logo: linkIcon,
      url: homePage ? homePage : null,
    },
  ]);

  return (
    <div className="page-links">
    {links.length > 0 ? (
      links.map(
        (link) =>
          link.url && (
            <a
              key={link.id}
              href={link.url}
              target="_self"
              rel="noopener noreferrer"
              className="social-link"
              data-title={"Visit " + link.id}
            >
              <img src={link.logo} alt={link.id} />
            </a>
          )
      )
    ) : (
      <span style={{ textAlign: "center" }}>N/A</span>
    )}
  </div>
  );
}

export default Links;
