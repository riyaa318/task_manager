import React, { useState } from "react";
import Board from "./Board";
import "./Dashboard.css";

function Dashboard({ boards, setBoards, searchTerm, updateBoard }) {
  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      setBoards([
        ...boards,
        {
          id: Date.now(),
          name: boardName,
          lists: [
            { id: Date.now() + 1, name: "To Do" },
            { id: Date.now() + 2, name: "In Progress" },
            { id: Date.now() + 3, name: "Done" },
          ],
          tasks: [],
        },
      ]);
      setBoardName("");
      setShowModal(false);
    }
  };

  const deleteBoard = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <div className="dashboard">
      <h1>{boards.length === 0 ? "No boards yet" : "Your Boards"}</h1>
      {boards.length === 0 && (
        <p>Create your first board to get started with task management</p>
      )}
      <button className="btn" onClick={() => setShowModal(true)}>
        Create Board
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Create Board</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
              />
              <div className="modal-buttons">
                <button type="submit" className="btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="boards-container">
        {filteredBoards.map((board) => (
          <div key={board.id} className="board-wrapper">
            <Board board={board} updateBoard={updateBoard} darkMode={false} />
            <button
              className="delete-btn"
              onClick={() => deleteBoard(board.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
