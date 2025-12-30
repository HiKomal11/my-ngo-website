import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function CampaignJoinForm() {
  const { id } = useParams(); // campaign ID from route
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/campaign-participation/`, {
        campaign: id,
        name: form.name,
        email: form.email,
      });
      alert("✅ You successfully joined the campaign! ");
      setForm({ name: "", email: "" });
    } catch (err) {
      console.error("Error joining campaign:", err);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Join Campaign</h2>
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
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Joining..." : "Join Campaign"}
        </button>
      </form>
    </div>
  );
}
