import React from "react";
import PropTypes from "prop-types";
import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import AddNote from "../components/Button/AddNote";

function UnArchivedNote({ notes, SearchNotesItem, querySearch }) {
  const unArchivedNotes = notes.filter((note) => note.archived === false);

  return (
    <>
      <SearchBar SearchNotesItem={SearchNotesItem} querySearch={querySearch} />
      {unArchivedNotes.length !== 0 ? (
        <NoteContainer notes={unArchivedNotes} />
      ) : (
        <div className="no-archived-note">
          <h4 className="empty-notes-message text-center">There is no notes</h4>
        </div>
      )}
      <AddNote />
    </>
  );
}

UnArchivedNote.propTypes = {
  notes: PropTypes.array,
  SearchNotesItem: PropTypes.func.isRequired,
  querySearch: PropTypes.string,
};

export default UnArchivedNote;
