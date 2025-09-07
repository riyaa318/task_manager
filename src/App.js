import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("boards");
    try {
      return savedBoards ? JSON.parse(savedBoards) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addBoard = () => {
    const name = prompt("Enter board name:");
    if (name) {
      const defaultLists = [
        { id: Date.now() + 1, name: "To Do" },
        { id: Date.now() + 2, name: "In Progress" },
        { id: Date.now() + 3, name: "Done" },
      ];
      
      setBoards((prevBoards) => [
        ...prevBoards,
        { id: Date.now(), name, lists: defaultLists, tasks: [] }
      ]);
    }
  };

  const updateBoard = (boardId, updatedData) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId ? {...board, ...updatedData} : board
    ));
  };

  useEffect(() => {
    console.log("Saving:", boards);
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Navbar
        onCreateBoard={addBoard}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Dashboard 
        boards={boards} 
        setBoards={setBoards}
        updateBoard={updateBoard}
        searchTerm={searchTerm} 
      />
    </div>
  );
}

export default App;