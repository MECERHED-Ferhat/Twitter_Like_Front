import React from "react";
import "./main_header.css";

export default function MainHeader({ children }) {
  return (
    <header id="header">
      {children}
      <button
        id="header-back"
        onClick={() => {
          window.history.back();
        }}
      >
        <i className="fas fa-arrow-left" />
      </button>
    </header>
  );
}
