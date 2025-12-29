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
        // Save login state
        localStorage.setItem("token", "dummy-session-token");
        localStorage.setItem("isAdmin", res.isAdmin || false);

        // Redirect based on role
        if (res.isAdmin) {
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
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-primary">Login</h2>
      <form onSubmit={handleSubmit} className="mt-3 mx-auto" style={{ maxWidth: "400px" }}>
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      {/* Register Button */}
      <div className="mt-4">
        <p>New user? Register below:</p>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate("/register")}
        >
          Register as New User
        </button>
      </div>

      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default LoginPage;
