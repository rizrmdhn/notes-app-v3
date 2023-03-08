import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import UnArchiveNote from "../components/Button/UnArchiveNote";
import ArchiveNote from "../components/Button/ArchiveNote";
import DeleteNote from "../components/Button/DeleteNote";
import toast from "../components/Toast";
import { getNote, archiveNote, deleteNote, unarchiveNote } from "../utils/api";
import Loading from "../components/Loading";

function DetailsNote() {
  const navigate = useNavigate();

  const [viewData, setViewData] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  async function fetchNoteData() {
    setIsLoading(true);
    setTimeout(async () => {
      const { data } = await getNote(id);
      if (data) {
        setViewData(data);
        setContent(data.body);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/notes/Error");
      }
    }, 1500);
  }

  useEffect(() => {
    fetchNoteData();
  }, []);

  const onArchiveNote = async () => {
    await archiveNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil diarsipkan",
    });

    navigate("/");
  };

  const onUnArchiveNote = async () => {
    await unarchiveNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil diaktifkan",
    });

    navigate("/");
  };

  const onDeleteNote = async () => {
    await deleteNote(id);

    toast.fire({
      icon: "success",
      title: "Catatan berhasil dihapus",
    });

    navigate("/");
  };

  return (
    <div className="details-note">
      <div className="row">
        <div className="col">
          {isLoading !== true ? (
            <>
              <h1 className="notes-title">{viewData.title}</h1>
              <h5 className="notes-date-created text-muted">
                {showFormattedDate(viewData.createdAt)}
              </h5>
              <div className="notes-content">
                <h5
                  name="notes-content"
                  id="content"
                  cols="30"
                  rows="10"
                  value={content}
                ></h5>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="action-button">
        {viewData.archived ? (
          <UnArchiveNote UnArchiveNotes={() => onUnArchiveNote()} />
        ) : (
          <ArchiveNote ArchiveNotes={() => onArchiveNote()} />
        )}
        <DeleteNote DeleteNotes={() => onDeleteNote()} />
      </div>
    </div>
  );
}

export default DetailsNote;
