import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function VolunteerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest_area: "",
    skills: "",
    availability: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      await axios.post(`${BACKEND_URL}/volunteers/`, form);
      setFeedback("✅ Volunteer registered successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        interest_area: "",
        skills: "",
        availability: "",
      });
    } catch (err) {
      console.error("Error submitting volunteer:", err.response?.data || err.message);
      setFeedback("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Volunteer Signup</h2>
      <p className="text-muted">
        Join our mission by volunteering for projects and events. Fill out the form below to get started.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number (optional)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Interest Area</label>
          <input
            type="text"
            name="interest_area"
            value={form.interest_area}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Education, Healthcare, Environment"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="List your skills (e.g., teaching, organizing, fundraising)"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input
            type="text"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., weekends, evenings"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      {feedback && (
        <div className="alert alert-info mt-3 text-center">{feedback}</div>
      )}
    </div>
  );
}
