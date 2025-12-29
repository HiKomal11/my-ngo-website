import React from "react";
import { NavLink } from "react-router-dom";
// ✅ Make sure you have FontAwesome or Bootstrap Icons installed
// npm install @fortawesome/fontawesome-free

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* NGO Branding */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-primary">Helping Hands Foundation</h5>
            <p className="small">
              Creating lasting impact through education, healthcare, and livelihood opportunities
              for underprivileged communities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="text-light text-decoration-none">Home</NavLink></li>
              <li><NavLink to="/about" className="text-light text-decoration-none">About Us</NavLink></li>
              <li><NavLink to="/projects" className="text-light text-decoration-none">Projects</NavLink></li>
              <li><NavLink to="/blog" className="text-light text-decoration-none">Blog</NavLink></li>
              <li><NavLink to="/contact" className="text-light text-decoration-none">Contact Us</NavLink></li>
              <li><NavLink to="/donate" className="text-light text-decoration-none">Donate</NavLink></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Connect With Us</h6>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-light text-decoration-none"
                >
                  <i className="fab fa-facebook me-2"></i> Facebook
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-light text-decoration-none"
                >
                  <i className="fab fa-twitter me-2"></i> Twitter
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-light text-decoration-none"
                >
                  <i className="fab fa-instagram me-2"></i> Instagram
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-light text-decoration-none"
                >
                  <i className="fab fa-linkedin me-2"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3 border-top pt-3 small">
          © {new Date().getFullYear()} Helping Hands Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
