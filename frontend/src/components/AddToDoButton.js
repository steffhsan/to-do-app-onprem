import React from "react";

const AddToDoButton = ({ onClick }) => {
  return (
    <div className="mt-3">
      <button
        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "4rem",
          height: "4rem",
          fontSize: "2rem",
          lineHeight: "1",
        }}
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
};

export default AddToDoButton;
