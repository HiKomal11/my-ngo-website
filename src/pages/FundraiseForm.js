import React, { useState } from "react";
import axios from "axios";

export default function FundraiseForm() {
  const [form, setForm] = useState({
    title: "",
    goal_amount: "",
    organizer_name: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://127.0.0.1:8000/api/campaigns/", {
    title: form.title,
    goal_amount: form.goal_amount,
    organizer_name: form.organizer_name,
    description: form.description,
  })
    .then(res => {
      alert("✅ Fundraising campaign created successfully!");
      setForm({ title: "", goal_amount: "", organizer_name: "", description: "" });
    })
    .catch(err => {
      console.error("Error submitting campaign:", err.response?.data || err.message);
      alert("❌ Something went wrong. Please check console for details.");
    });
};

  return (
    <div className="container py-5">
      <h2>Start a Fundraising Campaign</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Campaign Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Goal Amount</label>
          <input type="number" name="goal_amount" value={form.goal_amount} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Organizer Name</label>
          <input type="text" name="organizer_name" value={form.organizer_name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-secondary">Create Campaign</button>
      </form>
    </div>
  );
}
