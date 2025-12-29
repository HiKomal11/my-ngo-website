import React, { useState } from "react";
import { submitContactForm } from "../services/api";  // ✅ use centralized API

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // ✅ Send to Django backend via centralized API
      await submitContactForm(form);
      setStatus("✅ Thanks! We’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Oops! Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm">
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
        {status && <div className="alert alert-info mt-3 mb-0">{status}</div>}
      </div>
    </form>
  );
}
