import React, { useContext } from "react";
import "./styles/styles.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import LocaleContext from "../../contexts/LocaleContext";

function SearchBar({ SearchNotesItem, querySearch }) {
  const { locale } = useContext(LocaleContext);

  const location = useLocation();

  return (
    <div className="search-bar">
      {location.pathname === "/archives" ? (
        <h2 className="search-bar-title">
          {locale === "id" ? "Catatan Arsip" : "Archived Notes"}
        </h2>
      ) : (
        <h2 className="search-bar-title">
          {locale === "id" ? "Catatan Aktif" : "Active Notes"}
        </h2>
      )}
      <input
        type="text"
        className="searchBarInput"
        id="searchBarInput"
        aria-describedby="searchBarInput"
        placeholder={
          locale === "id"
            ? "Cari catatan berdasarkan judul ..."
            : "Search notes by title ... "
        }
        onChange={SearchNotesItem}
        value={querySearch}
      />
    </div>
  );
}

SearchBar.propTypes = {
  SearchNotesItem: PropTypes.func.isRequired,
  querySearch: PropTypes.string.isRequired,
};

export default SearchBar;
