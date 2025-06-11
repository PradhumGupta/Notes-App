import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <div className="container-fluid container-fluid-custom">
        <main>
          <div className="row py-md-5 text-center justify-content-center home">
            <div className="col-md-12 col-lg-6 mb-6 mb-md-0">
              <h1 className="display-2 fw-bold mb-4 position-relative home-title">
                Write your thoughts down as they come to you.
              </h1>
              <p className="fs-4 mb-4">
                Notes is a simple to use free note taking app made with MERN
                Technologies
              </p>
              <a href="http://localhost:5000/auth/google" className="btn btn-primary btn-lg">
                Try Notes, it's FREE!
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
