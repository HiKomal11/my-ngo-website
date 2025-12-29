import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function FundraiseForm() {
  const [form, setForm] = useState({
    title: "",
    goal_amount: "",
    organizer_name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${BACKEND_URL}/api/campaigns/`, form);
      setMessage("✅ Fundraising campaign created successfully!");
      setForm({
        title: "",
        goal_amount: "",
        organizer_name: "",
        description: "",
      });
    } catch (err) {
      console.error("Error submitting campaign:", err.response?.data || err.message);
      setMessage("❌ Something went wrong. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary">💰 Start a Fundraising Campaign</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Campaign Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter campaign title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Goal Amount (₹)</label>
          <input
            type="number"
            name="goal_amount"
            value={form.goal_amount}
            onChange={handleChange}
            className="form-control"
            placeholder="50000"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Organizer Name</label>
          <input
            type="text"
            name="organizer_name"
            value={form.organizer_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter organizer name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Describe your campaign goals and impact"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>

      {/* Feedback Message */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
