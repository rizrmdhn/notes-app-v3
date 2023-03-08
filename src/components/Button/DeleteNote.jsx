import React from "react";
import PropTypes from "prop-types";

function DeleteNote({ DeleteNotes }) {
  return (
    <>
      <button
        title="Delete Note"
        className="btn btn-outline-secondary btn-sm btn-delete-note"
        onClick={DeleteNotes}
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  );
}

DeleteNote.propTypes = {
  DeleteNotes: PropTypes.func.isRequired,
};

export default DeleteNote;
