import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";
import toast from "../components/Toast";

function AddNewNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addNote({ title, body });

    setTitle("");
    setBody("");

    toast.fire({
      icon: "success",
      title: "Catatan berhasil ditambahkan",
    });

    navigate("/");
  };

  return (
    <div className="add-new-note-container">
      <div className="add-new-note">
        <div className="add-new-note-title">
          <input
            type="text"
            placeholder="Masukkan Title Catatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-new-note-content">
          <textarea
            placeholder="Take a note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <div className="action-button">
        <button
          title="Save Note"
          className="add-new-note-button"
          onClick={(e) => onSubmit(e)}
        >
          <i className="bi bi-check-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default AddNewNote;
