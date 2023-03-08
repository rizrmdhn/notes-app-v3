import React, { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import ArchivedNote from "./pages/ArchivedNote";
import UnArchivedNote from "./pages/UnArchivedNote";
import { getAllNotes } from "./utils/local-data";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import DetailsNote from "./pages/DetailsNote";
import AddNewNote from "./pages/AddNewNote";
import ErrorNoteNotFound from "./components/ErrorPage/ErrorNoteNotFound";

function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();

  const datas = getAllNotes();

  useEffect(() => {
    setNotes(datas);
  }, [datas]);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(query.toLowerCase());
  });

  const onSearch = (e) => {
    setSearchParam({ title: e.target.value });
    setQuery(e.target.value);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/"
                element={
                  <UnArchivedNote
                    notes={filteredNotes}
                    SearchNotesItem={(e) => onSearch(e)}
                    querySearch={query}
                  />
                }
              />
              <Route
                path="/archives"
                element={
                  <ArchivedNote
                    notes={filteredNotes}
                    SearchNotesItem={(e) => onSearch(e)}
                    querySearch={query}
                  />
                }
              />
              <Route path="/notes/Error" element={<ErrorNoteNotFound />} />
              <Route path="/notes/:id" element={<DetailsNote />} />
              <Route path="/notes/new" element={<AddNewNote />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
