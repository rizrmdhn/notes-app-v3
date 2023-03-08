import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "../components/Toast";
import LocaleContext from "../contexts/LocaleContext";
import { addNote } from "../utils/api";

function AddNewNote() {
  const { locale } = useContext(LocaleContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [limit, setLimit] = useState(50);

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
          <label htmlFor="title-input">
            {locale === "id" ? "Sisa Karakter: " : "Remaining Characters: "}
            {limit - title.length}
          </label>
          <input
            id="title-input"
            type="text"
            placeholder={
              locale === "id" ? "Masukkan Judul Catatan" : "Enter Note Title"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, limit))}
          />
        </div>
        <div className="add-new-note-content">
          <textarea
            placeholder={
              locale === "id" ? "Masukkan Isi Catatan" : "Enter Note Content"
            }
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
