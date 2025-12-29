import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/blog/`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("❌ Unable to load blogs. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading blogs...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">📝 Our Blog</h2>
      <div className="row g-4">
        {blogs.length === 0 ? (
          <p>No blog posts available.</p>
        ) : (
          blogs.map((blog) => (
            <div className="col-md-6" key={blog.id}>
              <div className="card shadow-sm h-100">
                {blog.image && (
                  <img
                    src={
                      blog.image.startsWith("/media/")
                        ? `${BACKEND_URL}${blog.image}`
                        : blog.image
                    }
                    alt={blog.title}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x200?text=Image+Unavailable")
                    }
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="text-muted small mb-2">
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : "Unknown date"}{" "}
                    — By {blog.author || "Admin"}
                  </p>
                  <p className="card-text flex-grow-1">
                    {blog.excerpt
                      ? blog.excerpt
                      : blog.content?.length > 120
                      ? blog.content.substring(0, 120) + "..."
                      : blog.content}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
