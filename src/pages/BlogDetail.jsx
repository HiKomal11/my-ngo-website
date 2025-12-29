import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/blog/${id}/`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
        setError("❌ Unable to load blog. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading blog...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!blog) return <div className="container py-5">Blog not found.</div>;

  return (
    <div className="container py-5">
      {/* Blog Title */}
      <h2 className="fw-bold text-primary mb-3">{blog.title}</h2>

      {/* Author + Date */}
      <p className="text-muted">
        By {blog.author || "Unknown author"} •{" "}
        {blog.created_at
          ? new Date(blog.created_at).toLocaleDateString()
          : "Unknown date"}
      </p>

      {/* Cover Image */}
      {blog.image && (
        <img
          src={
            blog.image.startsWith("/media/")
              ? `${BACKEND_URL}${blog.image}`
              : blog.image
          }
          alt={blog.title}
          className="img-fluid rounded mb-4"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/800x400?text=Image+Unavailable")
          }
        />
      )}

      <hr />

      {/* Blog Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
