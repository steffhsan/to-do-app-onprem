import React from "react";

const DoneList = ({ todos }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="toast show mb-2"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ minWidth: "200px" }}
        >
          <div className="toast-header">
            <strong className="me-auto">{todo.title}</strong>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoneList;
