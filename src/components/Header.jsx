import React from "react";

export default function Header() {
  return (
    <header className="bg-primary text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo + NGO Name */}
        <div className="d-flex align-items-center">
          {/* Logo placeholder (replace src with your logo file later) */}
          <img
            src="/logo192.png"
            alt="Helping Hands Foundation Logo"
            className="me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <h1 className="h4 mb-0 fw-bold">Helping Hands Foundation</h1>
        </div>

        {/* Tagline */}
        <span className="small fst-italic">
          Creating lasting impact through compassion & action
        </span>
      </div>
    </header>
  );
}
