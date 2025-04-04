import { Button } from "bootstrap";
import React from "react";

const ToDoCard = ({
  title,
  text,
  date,
  onDelete,
  done,
  onToggleDone,
  onUpdate,
}) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [isEditingText, setIsEditingText] = React.useState(false);

  const [newTitle, setNewTitle] = React.useState(title);
  const [newText, setNewText] = React.useState(text);

  const handleSave = (field) => {
    onUpdate(newTitle, newText);
    if (field === "title") setIsEditingTitle(false);
    if (field === "text") setIsEditingText(false);
  };

  return (
    <div className={`card mb-3 ${done ? "todo-done" : ""}`}>
      <div className="card-body pb-2">
        {isEditingTitle ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control mb-2"
            autoFocus
          />
        ) : (
          <h5
            className={`card-title ${!title ? "text-muted" : ""}`}
            onClick={() => setIsEditingTitle(true)}
            style={{ cursor: "pointer" }}
          >
            {title || "Titel hinzufügen..."}
          </h5>
        )}

        {isEditingText ? (
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="form-control mb-2"
            rows={3}
            placeholder="Beschreibung..."
            autoFocus
          />
        ) : (
          <p
            className={`card-text ${!text ? "text-muted" : ""}`}
            onClick={() => setIsEditingText(true)}
            style={{ cursor: "pointer" }}
          >
            {text || "Text hinzufügen..."}
          </p>
        )}
        {(isEditingTitle || isEditingText) && (
          <div className="d-flex justify-content-center mt-2">
            <button
              className="btn btn-sm btn-link "
              onClick={() => {
                onUpdate(newTitle, newText);
                setIsEditingTitle(false);
                setIsEditingText(false);
              }}
            >
              💾
            </button>

            <button
              className="btn btn-sm btn-link ms-2 success"
              onClick={() => {
                setNewTitle(title);
                setNewText(text);
                setIsEditingTitle(false);
                setIsEditingText(false);
              }}
            >
              ❌
            </button>
          </div>
        )}

        <small className="text-muted">Erstellt: {date}</small>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-success btn-sm"
            onClick={onToggleDone}
            disabled={done}
          >
            ✓
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={onDelete}
            disabled={done}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoCard;
