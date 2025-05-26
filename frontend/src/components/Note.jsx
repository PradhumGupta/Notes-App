import React from "react";

const Note = ({ note }) => {
  return (
    <>
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.body}</p>
    </>
  );
};

export default Note;
