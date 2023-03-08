import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  editNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";
import { showFormattedDate } from "../utils";
import UnArchiveNote from "../components/Button/UnArchiveNote";
import ArchiveNote from "../components/Button/ArchiveNote";
import DeleteNote from "../components/Button/DeleteNote";
import SaveNote from "../components/Button/SaveNote";
import toast from "../components/Toast";

function DetailsNote() {
  const navigate = useNavigate();

  const [viewData, setViewData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const datas = getNote(id);
    if (datas) {
      setViewData(datas);
      setContent(datas.body);
    } else {
      navigate("/notes/Error");
    }
  }, []);

  const onArchiveNote = (id) => {
    archiveNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil diarsipkan",
    });

    navigate("/");
  };

  const onUnArchiveNote = (id) => {
    unarchiveNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil diaktifkan",
    });

    navigate("/");
  };

  const onDeleteNote = (id) => {
    deleteNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil dihapus",
    });

    navigate("/");
  };

  const onChangeNote = (e) => {
    const editedContent = e.target.value;
    if (editedContent !== viewData.body) {
      setEditMode(true);
      setContent(editedContent);
    } else {
      setContent(editedContent);
      setEditMode(false);
    }
  };

  const onEditNote = (id, title) => {
    editNote({ id, title, body: content });
    setEditMode(false);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil diedit",
    });

    navigate("/");
  };

  return (
    <div className="details-note">
      <div className="row">
        <div className="col">
          <h1 className="notes-title">{viewData.title}</h1>
          <h5 className="notes-date-created text-muted">
            {showFormattedDate(viewData.createdAt)}
          </h5>
          <div className="notes-content">
            <textarea
              name="notes-content"
              id="content"
              cols="30"
              rows="10"
              value={content}
              onChange={(e) => onChangeNote(e)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="action-button">
        {viewData.archived ? (
          <UnArchiveNote UnArchiveNotes={() => onUnArchiveNote(viewData.id)} />
        ) : (
          <ArchiveNote ArchiveNotes={() => onArchiveNote(viewData.id)} />
        )}
        <DeleteNote DeleteNotes={() => onDeleteNote(viewData.id)} />
        {editMode ? (
          <SaveNote SaveNotes={() => onEditNote(viewData.id, viewData.title)} />
        ) : null}
      </div>
    </div>
  );
}

export default DetailsNote;
