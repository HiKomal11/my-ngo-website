import React from "react";

export default function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0">NGO Name</h1>
        <span className="small">Creating lasting impact</span>
      </div>
    </header>
  );
}
