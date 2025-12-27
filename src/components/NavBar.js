import React from "react";
import { NavLink, useNavigate } from "react-router-dom";  // ✅ include useNavigate
import { useTranslation } from "react-i18next";


export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (
    <nav className="bg-light border-bottom py-2">
      <div className="container d-flex justify-content-between align-items-center">
        {/* NGO Brand Name */}
        <div className="navbar-brand fw-bold text-primary">
          Helping Hands Foundation
        </div>

        {/* Navigation Links */}
        <ul className="nav">
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
                  "nav-link" + (isActive ? " fw-semibold text-primary" : "")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <select
          className="form-select form-select-sm w-auto ms-3"
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          defaultValue="en"
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

      </div>
    </nav>
  );
}
