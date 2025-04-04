import React from "react";

const ArchivedList = ({ todos }) => {
  return (
    <div className="mt-5">
      <h5 className="mb-3"> Archivierte Aufgaben ({todos.length})</h5>
      <div className="row">
        {todos.map((todo) => (
          <div key={todo.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-title text-muted">
                  {todo.title || "Unbenannt"}
                </h6>
                <p className="card-text small">{todo.text}</p>
              </div>
              <div className="card-footer bg-light text-muted small">
                <span> {todo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedList;
