import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);

      if (res.message === "Login successful") {
        // Example: backend should return role info (e.g., res.isAdmin)
        // For now, simulate role check
        const isAdmin = res.isAdmin || false;

        // Save login state in localStorage
        localStorage.setItem("token", "dummy-session-token"); // replace with real token if backend provides
        localStorage.setItem("isAdmin", isAdmin);

        // Redirect based on role
        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setMessage(res.error || "Login failed");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary">Login</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            name="username"
            placeholder="Username"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default LoginPage;
