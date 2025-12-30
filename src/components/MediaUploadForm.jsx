import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function MediaUploadForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "photo",
    url: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("type", form.type);
    if (form.url) data.append("url", form.url);
    if (form.image) data.append("image", form.image);

    try {
      await axios.post(`${BACKEND_URL}/media/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Media uploaded successfully ");
      setForm({ title: "", description: "", type: "photo", url: "", image: null });
    } catch (err) {
      console.error("Error uploading media:", err);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2>Upload Media</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
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
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="press">Press Coverage</option>
            <option value="blog">Blog/News</option>
          </select>
        </div>

        {form.type === "photo" ? (
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label">URL</label>
            <input
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        )}

        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
