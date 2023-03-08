import React from "react";
import "../styles/styles.css";
import PropTypes from "prop-types";
import NoteCardBody from "./NoteCardBody";

function NoteCard({ id, title, body, createdAt }) {
  return (
    <div className="card">
      <NoteCardBody id={id} title={title} body={body} createdAt={createdAt} />
    </div>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
};

export default NoteCard;
