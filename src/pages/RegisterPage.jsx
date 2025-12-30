import React, { useState } from "react";
import { registerUser } from "../services/api"; // axios wrapper
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Call your backend via axios service
      const res = await registerUser(formData);
      const data = res.data;

      if (data.message === "User registered successfully") {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500); // redirect after 1.5s
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-primary">Register</h2>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="mt-3 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            name="username"
            placeholder="Username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      {/* Back to Login Button */}
      <div className="mt-4">
        <p>Already have an account?</p>
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>

      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default RegisterPage;
