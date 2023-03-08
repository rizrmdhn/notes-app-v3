import React from "react";
import "./styles/styles.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function SearchBar({ SearchNotesItem, querySearch }) {
  const location = useLocation();

  return (
    <div className="search-bar">
      {location.pathname === "/archives" ? (
        <h2 className="search-bar-title">Catatan Arsip</h2>
      ) : (
        <h2 className="search-bar-title">Catatan Aktif</h2>
      )}
      <input
        type="text"
        className="searchBarInput"
        id="searchBarInput"
        aria-describedby="searchBarInput"
        placeholder="Cari berdasarkan judul ..."
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
