import React, { useState } from "react";
import TaskCard from "./TaskCard";
import "./List.css";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy,} from "@dnd-kit/sortable";

function List({
  list,
  darkMode,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDeleteList,
  onRenameList,
  isDefaultList,
}) {
  const { id: listId, name } = list;
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [editTask, setEditTask] = useState(null);

  const { setNodeRef } = useDroppable({
    id: listId,
    data: { listId },
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(listId, taskTitle, taskDesc);
      setTaskTitle("");
      setTaskDesc("");
      setShowTaskModal(false);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setTaskTitle(task.title);
    setTaskDesc(task.description);
    setShowTaskModal(true);
  };

  const saveEditedTask = () => {
    onEditTask(editTask.id, { title: taskTitle, description: taskDesc });
    setEditTask(null);
    setTaskTitle("");
    setTaskDesc("");
    setShowTaskModal(false);
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <div className={`list ${darkMode ? "dark" : "light"}`}>
      <div className="list-header">
        <h3>{name}</h3>
        <div className="list-actions">
          {!isDefaultList && <button onClick={onRenameList}>✎</button>}
          {!isDefaultList && <button onClick={onDeleteList}>🗑️</button>}
        </div>
      </div>
      <br></br>
      <button className="taskBtn" onClick={() => setShowTaskModal(true)}>
        + Add Task
      </button>

      <div className="tasks-container" ref={setNodeRef}>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>

      {showTaskModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>{editTask ? "Edit Task" : "Add Task"}</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTask ? saveEditedTask() : handleAddTask(e);
              }}
            >
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task title"
              />
              <textarea
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                placeholder="Task description"
                rows={3}
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskModal(false);
                    setEditTask(null);
                    setTaskTitle("");
                    setTaskDesc("");
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

export default List;
