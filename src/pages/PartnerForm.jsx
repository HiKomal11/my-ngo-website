import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function PartnerForm() {
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    message: "",
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
      await axios.post(`${BACKEND_URL}/partner-inquiries/`, form);
      setFeedback("✅ Partnership request submitted successfully!");
      setForm({
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting request:", err.response?.data || err.message);
      setFeedback("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Partner With Us</h2>
      <p className="text-muted">
        Collaborate with us to create meaningful impact through corporate partnerships and sponsorships.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Person</label>
          <input
            type="text"
            name="contact_person"
            value={form.contact_person}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter contact person's name"
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
            placeholder="Enter contact email"
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
            placeholder="Enter phone number (optional)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Tell us how you'd like to collaborate"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {feedback && (
        <div className="alert alert-info mt-3 text-center">{feedback}</div>
      )}
    </div>
  );
}
