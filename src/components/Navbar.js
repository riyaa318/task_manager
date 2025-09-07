import React from "react";
import "./Navbar.css";

function Navbar({
  onCreateBoard,
  darkMode,
  setDarkMode,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <nav className="navbar">
      <h1>Task Manager</h1>

      <h2 className="navbar-h2">Mange Your Boards Here</h2>

      <div className="nav-actions">
        <input
          type="text"
          placeholder="Search Boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button onClick={onCreateBoard}>+ Board</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
