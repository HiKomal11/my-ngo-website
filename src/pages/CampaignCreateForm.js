import React, { useState } from "react";
import axios from "axios";

export default function CampaignCreateForm() {
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/campaigns/", form)
      .then(() => {
        alert("Campaign created successfully! 🎉");
        setForm({ title: "", description: "" });
      })
      .catch(err => {
        console.error("Error creating campaign:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container py-5">
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Campaign Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
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
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-secondary">Create Campaign</button>
      </form>
    </div>
  );
}
