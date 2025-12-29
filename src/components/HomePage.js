
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Call your backend to check if user is logged in
    fetch("https://ngo-cms-backend-5oez.onrender.com/api/auth/status/", {
      credentials: "include", // important for Django session cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_authenticated) {
          setIsAuthenticated(true);
          setUsername(data.username);
        }
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isAuthenticated ? (
        <>
          <h2>Welcome back, {username} 👋</h2>
          <p>You are logged in. Go to your dashboard:</p>
          <a
            href="https://ngo-cms-backend-5oez.onrender.com/admin/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            Admin Dashboard
          </a>
        </>
      ) : (
        <>
          <h2>Welcome to the NGO CMS</h2>
          <p>Please log in to access the admin panel:</p>
          <a
            href="https://ngo-cms-backend-5oez.onrender.com/admin/login/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            Go to Admin Login
          </a>
        </>
      )}
    </div>
  );
}
