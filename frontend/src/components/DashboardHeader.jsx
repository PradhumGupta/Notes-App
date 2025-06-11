function DashboardHeader() {
    return (
        <div className="container-fluid">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
          <a
            href="/dashboard"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-primary text-decoration-none fw-bold fs-2"
          >
            Notes
          </a>

          <div className="col-md-3 text-end">
            <a href="/logout" type="button" className="btn btn-outline-primary">
              Logout
            </a>
          </div>
        </header>
      </div>
    )
}

export default DashboardHeader