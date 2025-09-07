import React from "react";
import "./TaskCard.css";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ id, title, description, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="task-card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="task-actions">
        <button onClick={onEdit}>✎</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default TaskCard;
