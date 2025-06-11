import { useCallback, useEffect, useState } from "react";
import { getNotes } from "../services/api";
import NotesList from "../components/NotesList";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotes(page);
      if (data) {
        setNotes(data.notes);
        setUser(data.userName);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function selectPageHandler(i) {
    setPage(i);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <>
      <div className="container-fluid container-fluid-custom pb-5 mb-5">
        <div className="row mb-4">
          <div className="col">
            <h1>Hey, {user || "user"}</h1>
          </div>
          <div className="col text-end">
            <a href="/dashboard/add" className="btn btn-primary">
              + New Note
            </a>
          </div>
        </div>

        {notes.length > 0 ? (
          loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <h3>Loading...</h3>
            </div>
          ) : (
            <NotesList notes={notes} />
          )
        ) : (
          <div className="row">
            <div className="col-3">
              <img
                src="../assets/img/human-3.svg"
                alt="Human pointing hand toward a create button"
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
        )}

        {notes.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-5">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Prev
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                <li
                  key={i}
                  className={`page-item ${page === i ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => selectPageHandler(i)}
                    aria-current={page === i ? "page" : undefined}
                  >
                    {i}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}

export default Dashboard;
