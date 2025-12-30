import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ parse correctly

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role"); // ✅ clear role
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language} // ✅ bind to current language
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
