import React from "react";
import "./styles/styles.css";

export default function ErrorNoteNotFound() {
  return (
    <div className="error-page">
      <div className="row">
        <div className="col text-center">
          <h1>Error</h1>
          <br />
          <h2>404</h2>
          <br />
          <h3>Note Not Found</h3>
        </div>
      </div>
    </div>
  );
}
