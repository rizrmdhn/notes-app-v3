import React from "react";
import PropTypes from "prop-types";

function SaveNote({ SaveNotes }) {
  return (
    <>
      <button
        title="Save Note"
        className="btn btn-outline-secondary btn-sm btn-save-note"
        onClick={SaveNotes}
      >
        <i className="bi bi-check-lg"></i>
      </button>
    </>
  );
}

SaveNote.propTypes = {
  SaveNotes: PropTypes.func.isRequired,
};

export default SaveNote;
