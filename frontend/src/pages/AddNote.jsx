import React, { useRef } from "react";
import {useNavigate} from 'react-router-dom'
import { addNote } from "../services/api";

function AddNote() {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    try {
        await addNote({title, body})
        navigate("/dashboard")
    } catch (error) {
        console.error("Error adding note", error)
    }
  }

  return (
    <>
      <div className="container-fluid container-fluid-custom pb-5 mb-5">
        <div className="row mb-4">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Add Note</li>
              </ol>
            </nav>
            <div className="col d-flex justify-content-between align-items-center">
              <h1 className="h3">Add Note</h1>
            </div>
          </div>
        </div>

        <form className="position-relative" onSubmit={handleSubmit}>
          <div
            className="form-group mb-4 position-absolute"
            style={{left: '1px', top: '1px', right: '1px'}}
          >
            <input
              type="text"
              className="form-control fw-bold border-0 fs-4"
              id="title"
              name="title"
              ref={titleRef}
              placeholder="Title"
              required
            />
          </div>

          <div className="form-group mb-4">
            <textarea
              required
              className="form-control pt-5 fs-4"
              id="body"
              name="body"
              ref={bodyRef}
              placeholder="Take a note..."
              rows="12"
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              + Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNote
