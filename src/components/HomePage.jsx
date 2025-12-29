import React, { useEffect, useState } from "react";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Call backend to check if user is logged in
    fetch(`${BACKEND_URL}/api/auth/status/`, {
      credentials: "include", // important for Django session cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_authenticated) {
          setIsAuthenticated(true);
          setUsername(data.username);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        setError("❌ Unable to check authentication status. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      {isAuthenticated ? (
        <>
          <h2>Welcome back, {username} </h2>
          <p>You are logged in. Go to your dashboard:</p>
          <a
            href={`${BACKEND_URL}/admin/`}
            className="btn btn-success mt-3"
          >
            Admin Dashboard
          </a>
        </>
      ) : (
        <>
          <h2>Welcome to the NGO CMS</h2>
          <p>Please log in to access the admin panel:</p>
          <a
            href={`${BACKEND_URL}/admin/login/`}
            className="btn btn-primary mt-3"
          >
            Go to Admin Login
          </a>
        </>
      )}
    </div>
  );
}
