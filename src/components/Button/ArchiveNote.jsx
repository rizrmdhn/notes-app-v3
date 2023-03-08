import React from "react";
import PropTypes from "prop-types";

function ArchiveNote({ ArchiveNotes }) {
  return (
    <>
      <button
        title="Archive Note"
        className="btn btn-outline-secondary btn-sm btn-archive-note"
        onClick={ArchiveNotes}
      >
        <i className="bi bi-box-arrow-in-down"></i>
      </button>
    </>
  );
}

ArchiveNote.propTypes = {
  ArchiveNotes: PropTypes.func.isRequired,
};

export default ArchiveNote;
