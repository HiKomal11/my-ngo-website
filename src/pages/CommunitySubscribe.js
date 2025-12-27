import React, { useState } from "react";
import axios from "axios";

export default function CommunitySubscribe() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/subscribe/", form)
      .then(res => {
        alert("Subscription successful! 🎉");
        setForm({ name: "", email: "" });
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container py-5">
      <h2>Join the Community</h2>
      <p>Subscribe to our newsletter and stay updated on events and campaigns.</p>
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
        <button type="submit" className="btn btn-success">Subscribe</button>
      </form>
    </div>
  );
}
