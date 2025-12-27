import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CampaignJoinForm() {
  const { id } = useParams(); // campaign ID from route
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/campaign-participation/", {
      campaign: id,
      name: form.name,
      email: form.email,
    })
    .then(() => {
      alert("You successfully joined the campaign! 🎉");
      setForm({ name: "", email: "" });
    })
    .catch(err => {
      console.error("Error joining campaign:", err);
      alert("Something went wrong. Please try again.");
    });
  };

  return (
    <div className="container py-5">
      <h2>Join Campaign</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
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
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">Join</button>
      </form>
    </div>
  );
}
