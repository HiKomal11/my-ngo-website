import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function MediaList() {
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState("");

  const fetchMedia = () => {
    axios
      .get(`${BACKEND_URL}/media/`)
      .then((res) => setMediaItems(res.data))
      .catch((err) => {
        console.error("Error fetching media:", err);
        setError("❌ Unable to load media items. Please try again later.");
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this media item?")) {
      axios
        .delete(`${BACKEND_URL}/media/${id}/`)
        .then(() => {
          alert("✅ Media item deleted successfully!");
          fetchMedia();
        })
        .catch((err) => {
          console.error("Error deleting media:", err);
          alert("❌ Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4"> All Media</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/media/upload" className="btn btn-secondary mb-3">
        + Upload New Media
      </Link>
      {mediaItems.length === 0 && !error ? (
        <p>No media items found. Upload something to get started!</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.description || "No description"}</td>
                <td>{new Date(item.uploaded_at).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/media/${item.id}/edit`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
