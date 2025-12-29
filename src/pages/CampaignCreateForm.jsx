import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function CampaignCreateForm() {
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/campaigns/`, form);
      alert("✅ Campaign created successfully! 🎉");
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Create New Campaign</h2>
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
    </div>
  );
}
