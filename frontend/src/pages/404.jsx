import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div class="container-fluid container-fluid-custom py-md-5 mb-5">
      <main>
        <div class="row py-md-5 text-center justify-content-center">
          <div class="col-md-12 col-lg-6 mb-6 mb-md-0">
            <h1 class="display-2 fw-bold mb-4 position-relative home-title">
              404 , Page not found.
            </h1>

            <a href="/" class="btn btn-primary btn-lg">
              Explore Notes.
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound
