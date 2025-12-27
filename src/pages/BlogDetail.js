import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blog/${id}/`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container py-5">Loading blog...</div>;
  if (!blog) return <div className="container py-5">Blog not found.</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary">{blog.title}</h2>
      <p className="text-muted">
        By {blog.author} •{" "}
        {blog.created_at
          ? new Date(blog.created_at).toLocaleDateString()
          : "Unknown date"}
      </p>
      <hr />
      {/* ✅ Render HTML safely */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
