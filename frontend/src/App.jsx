import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import './App.css'
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNote";
import ViewNote from "./pages/ViewNote";
import Header from "./components/Header";
import DashboardHeader from "./components/DashboardHeader";
import NotFound from "./pages/404";

function Layout() {
  const location = useLocation(); // Now inside Router ✅

  return (
    <>
      {location.pathname === "/" ? <Header /> : <DashboardHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<AddNote />} />
        <Route path="/dashboard/item/:id" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
