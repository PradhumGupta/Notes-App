import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote, deleteNote } from "../services/api";

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      try {
        const data = await getNoteById(id);
        setNote(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const updatedNote = await updateNote(id, note);
      if (updateNote) {
        setNote({ ...updatedNote });
        console.log("Note updated successfully!");
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      alert("Failed to update note.");
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteNote(id); // Call API function to delete note
      console.log(response.message);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message || "Failed to load note."}</div>;
  }

  if (!note) {
    return <div>Note not found.</div>;
  }

  return (
    <>
      <div className="container-fluid container-fluid-custom pb-5 mb-5">
        <div className="row mb-4">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="breadcrumb-item active">{note.title}</li>
              </ol>
            </nav>
            <div className="col d-flex justify-content-between align-items-center">
              <h1 className="h3">View Note</h1>
              <button
                type="button"
                className="btn btn-danger me-2"
                data-bs-toggle="modal"
                id="deleteButton"
                data-bs-target="#deleteModal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <form className="position-relative" onSubmit={handleUpdate}>
          <div
            className="form-group mb-4 position-absolute"
            style={{ left: "1px", top: "1px", right: "1px" }}
          >
            <input
              type="text"
              className="form-control fw-bold border-0 fs-4"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>

          <div className="form-group mb-4">
            <textarea
              className="form-control pt-5 fs-4"
              name="body"
              value={note.body}
              onChange={handleChange}
              placeholder="Take a note..."
              rows="12"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Update
            </button>
          </div>
        </form>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewNote;
