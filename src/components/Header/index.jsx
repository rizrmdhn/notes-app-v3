import React from "react";
import "./styles/styles.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/" className="header-title">
        My Personal Note
      </Link>
      <Link to="/archives" className="header-arsip">
        Arsip
      </Link>
    </div>
  );
}

export default Header;
