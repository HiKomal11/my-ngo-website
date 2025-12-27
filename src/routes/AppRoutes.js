import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import OurWork from "../pages/OurWork";
import Projects from "../pages/Projects";
import Media from "../pages/Media";
import GetInvolved from "../pages/GetInvolved";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import Donate from "../pages/Donate";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/media" element={<Media />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
