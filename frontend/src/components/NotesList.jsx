import React from "react";
import Note from "./Note";
import { Link } from "react-router-dom";

const NotesList = ({ notes }) => {
  if (notes.length > 0) {
    return (
      <div className="row">
        {notes.map((note) => (
          <div className="col-sm-3 mb-4" key={note._id}>
            <div className="card border-primary" style={{ minHeight: "210px" }}>
              <Link
                to={`/dashboard/item/${note._id}`}
                className="card-body text-decoration-none"
              >
                <Note note={note} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col-3">
          <img
            src="../assets/img/human-3.svg"
          />
        </div>
        <div className="col mt-md-4">
          <h2>Okay...</h2>
          <h4>
            Let's start with your first note!
            <br />
            <br />
            <a href="/dashboard/add">Create one!</a>
          </h4>
        </div>
      </div>
    );
  }
};

export default NotesList;
