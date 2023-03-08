import React from "react";
import PropTypes from "prop-types";

function UnArchiveNote({ UnArchiveNotes }) {
  return (
    <>
      <button
        title="Unarchive Note"
        className="btn btn-outline-secondary btn-sm btn-unarchive-note"
        onClick={UnArchiveNotes}
      >
        <i className="bi bi-box-arrow-in-up"></i>
      </button>
    </>
  );
}

UnArchiveNote.propTypes = {
  UnArchiveNotes: PropTypes.func.isRequired,
};

export default UnArchiveNote;
