import React from "react";
import { Link } from "react-router-dom";
import "./styles/styles.css";

function AddNote() {
  return (
    <div className="add-note-button-container">
      <button title="Add Note" className="add-note-button">
        <Link to="/notes/new" className="add-new-note-button">
          <i className="bi bi-plus-lg"></i>
        </Link>
      </button>
    </div>
  );
}

export default AddNote;
