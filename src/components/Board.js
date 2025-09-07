import React, { useState } from "react";
import List from "./List";
import { DndContext, closestCenter } from "@dnd-kit/core";
import "./Board.css";

function Board({ board, updateBoard, darkMode }) {
  const { id: boardId, lists, tasks } = board;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newListId = over.data.current?.listId;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, listId: newListId || task.listId } : task
    );

    updateBoard(boardId, { tasks: updatedTasks });
  };

  const addList = (listName) => {
    const newList = { id: Date.now(), name: listName };
    updateBoard(boardId, { lists: [...lists, newList] });
  };

  const renameList = (listId, newName) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list
    );
    updateBoard(boardId, { lists: updatedLists });
  };

  const deleteList = (listId) => {
    const defaultListNames = ["To Do", "In Progress", "Done"];
    const listToDelete = lists.find((list) => list.id === listId);

    if (defaultListNames.includes(listToDelete.name)) {
      alert("Cannot delete default lists (To Do, In Progress, Done)");
      return;
    }

    const updatedLists = lists.filter((list) => list.id !== listId);
    const updatedTasks = tasks.filter((task) => task.listId !== listId);
    updateBoard(boardId, { lists: updatedLists, tasks: updatedTasks });
  };

  const addTask = (listId, title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      listId,
    };
    updateBoard(boardId, { tasks: [...tasks, newTask] });
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    updateBoard(boardId, { tasks: updatedTasks });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    updateBoard(boardId, { tasks: updatedTasks });
  };

  const [showListModal, setShowListModal] = useState(false);
  const [listName, setListName] = useState("");

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameListId, setRenameListId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      addList(listName);
      setListName("");
      setShowListModal(false);
    }
  };

  const openRenameList = (listId, currentName) => {
    const defaultListNames = ["To Do", "In Progress", "Done"];
    if (defaultListNames.includes(currentName)) {
      alert("Cannot rename default lists (To Do, In Progress, Done)");
      return;
    }

    setRenameListId(listId);
    setRenameValue(currentName);
    setShowRenameModal(true);
  };

  const handleRenameList = (e) => {
    e.preventDefault();
    if (renameValue.trim()) {
      renameList(renameListId, renameValue);
      setShowRenameModal(false);
      setRenameListId(null);
      setRenameValue("");
    }
  };

  return (
    <div className={`board ${darkMode ? "dark" : "light"}`}>
      <div className="board-header">
        <h2>{board.name}</h2>
        <button className="listBtn" onClick={() => setShowListModal(true)}>
          + Add List
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="lists-container">
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              darkMode={darkMode}
              tasks={tasks.filter((task) => task.listId === list.id)}
              onAddTask={addTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onDeleteList={() => deleteList(list.id)}
              onRenameList={() => openRenameList(list.id, list.name)}
              isDefaultList={["To Do", "In Progress", "Done"].includes(
                list.name
              )}
            />
          ))}
        </div>
      </DndContext>

      {showListModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>Add New List</h4>
            <form onSubmit={handleAddList}>
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowListModal(false);
                    setListName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRenameModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>Rename List</h4>
            <form onSubmit={handleRenameList}>
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Enter new list name"
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRenameModal(false);
                    setRenameListId(null);
                    setRenameValue("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;