import React from "react";
import PropTypes from "prop-types";
import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";

function ArchivedNote({ notes, SearchNotesItem, querySearch }) {
  const archivedNotes = notes.filter((note) => note.archived === true);
  return (
    <>
      <SearchBar SearchNotesItem={SearchNotesItem} querySearch={querySearch} />
      {archivedNotes.length !== 0 ? (
        <NoteContainer notes={archivedNotes} />
      ) : (
        <div className="no-archived-note">
          <h4 className="empty-notes-message text-center">There is no notes</h4>
        </div>
      )}
    </>
  );
}

ArchivedNote.propTypes = {
  notes: PropTypes.array,
  SearchNotesItem: PropTypes.func.isRequired,
  querySearch: PropTypes.string,
};

export default ArchivedNote;
