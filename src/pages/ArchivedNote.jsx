import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { getArchivedNotes } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function ArchivedNote({
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
      const { data } = await getArchivedNotes();
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
                  ? "Tidak ada catatan yang diarsipkan"
                  : "No archived notes"}
              </h4>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

ArchivedNote.propTypes = {
  SearchNotesItem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  querySearch: PropTypes.string,
};

export default ArchivedNote;
