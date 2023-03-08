import React from "react";
import PropTypes from "prop-types";
import NoteCard from "./views/NoteCard";

function NoteContainer({ notes }) {
  return (
    <div className="note-container">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
}

NoteContainer.propTypes = {
  notes: PropTypes.array,
};

export default NoteContainer;
