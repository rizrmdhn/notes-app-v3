import React from "react";
import "../styles/styles.css";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../../utils";
import { Link } from "react-router-dom";

function NoteCardBody({ id, title, body, createdAt }) {
  return (
    <div className="card-body">
      <h5 className="card-title">
        <Link to={`/notes/${id}`} className="card-notes-title">
          {title}
        </Link>
      </h5>
      <h6 className="card-subtitle mb-2 text-muted">
        {showFormattedDate(createdAt)}
      </h6>
      <p className="card-text">
        {body.length > 100 ? body.substring(0, 100) + "..." : body}
      </p>
    </div>
  );
}

NoteCardBody.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
};

export default NoteCardBody;
