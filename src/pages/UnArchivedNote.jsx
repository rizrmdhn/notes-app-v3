import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import AddNote from "../components/Button/AddNote";
import Loading from "../components/Loading";
import { getActiveNotes } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function UnArchivedNote({
  isLoading,
  setIsLoading,
  SearchNotesItem,
  querySearch,
}) {
  const { locale } = useContext(LocaleContext);

  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    setIsLoading(true);
    setTimeout(async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
      setIsLoading(false);
    }, 1500);
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(querySearch.toLowerCase());
  });

  return (
    <>
      <SearchBar SearchNotesItem={SearchNotesItem} querySearch={querySearch} />
      {isLoading !== true ? (
        <>
          {notes.length !== 0 ? (
            <NoteContainer notes={filteredNotes} />
          ) : (
            <div className="no-archived-note">
              <h4 className="empty-notes-message text-center">
                {locale === "id"
                  ? "Tidak ada catatan yang aktif"
                  : "No active notes"}
              </h4>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
      <AddNote />
    </>
  );
}

UnArchivedNote.propTypes = {
  SearchNotesItem: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  querySearch: PropTypes.string,
};

export default UnArchivedNote;
