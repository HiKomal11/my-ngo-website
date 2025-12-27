import React, { useState } from "react";
import axios from "axios";

export default function VolunteerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest_area: "",
    skills: "",
    availability: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/volunteers/", form)
      .then(res => {
        alert("Volunteer registered successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          interest_area: "",
          skills: "",
          availability: ""
        });
      })
      .catch(err => {
        console.error("Error submitting volunteer:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container py-5">
      <h2>Volunteer Signup</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Interest Area</label>
          <input type="text" name="interest_area" value={form.interest_area} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <textarea name="skills" value={form.skills} onChange={handleChange} className="form-control" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input type="text" name="availability" value={form.availability} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}
