import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  usePreventClickOnTextSelection,

} from "../components/utils/utils.js";

function HeadPerson({ title, people }) {
  const { isSelecting, handleMouseDown, handleMouseUp } =
    usePreventClickOnTextSelection();
  return (
    <div>
      <span>
        <b>{title}</b>:{" "}
      </span>
      {
  people.length > 0 ? (
    people
      .reduce((unique, person) => {
        if (!unique.some((u) => u.name === person.name)) {
          unique.push(person);
        }
        return unique;
      }, [])
      .map((person, index, array) => (
        <Fragment key={person.id}>
          <Link
            to={`/person/id/${person.id}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="head-person-name"
          >
            {person.name}
          </Link>

          {index !== array.length - 1 && <span className="dot">·</span>}
        </Fragment>
      ))
  ) : (
    <span>N/A</span>
  )
}

    </div>
  );
}

export default HeadPerson;
