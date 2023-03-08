import React, { useContext } from "react";
import "./styles/styles.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocaleContext from "../../contexts/LocaleContext";
import ThemeButton from "../Button/ThemeButton";

function Header({
  authedUser,
  getActiveNotes,
  getArchivedNotes,
  logout,
  name,
}) {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <div className="header">
      {authedUser !== null ? (
        <>
          <div className="header-title-container" onClick={getActiveNotes}>
            <Link to="/" className="header-title">
              {locale === "id" ? "Aplikasi Note" : "Note App"}
            </Link>
          </div>
          <div className="header-action-container" onClick={getArchivedNotes}>
            <Link to="/archives" className="header-arsip">
              {locale === "id" ? "Arsip" : "Archives"}
            </Link>
            <button className="change-language-button" onClick={toggleLocale}>
              <i className="bi bi-translate"></i>
            </button>
            <ThemeButton />
            <button className="logout-button" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>
              {name}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="header-title-container">
            <Link to="/" className="header-title">
              {locale === "id" ? "Aplikasi Note" : "Note App"}
            </Link>
          </div>
          <div className="header-action-container">
            <button className="change-language-button" onClick={toggleLocale}>
              <i className="bi bi-translate"></i>
            </button>
            <ThemeButton />
          </div>
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  authedUser: PropTypes.object,
  getActiveNotes: PropTypes.func,
  getArchivedNotes: PropTypes.func,
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Header;
