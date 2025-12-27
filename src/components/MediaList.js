import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MediaList() {
  const [mediaItems, setMediaItems] = useState([]);

  const fetchMedia = () => {
    axios.get("http://127.0.0.1:8000/api/media/")
      .then(res => setMediaItems(res.data))
      .catch(err => console.error("Error fetching media:", err));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this media item?")) {
      axios.delete(`http://127.0.0.1:8000/api/media/${id}/`)
        .then(() => {
          alert("Media item deleted successfully!");
          fetchMedia();
        })
        .catch(err => {
          console.error("Error deleting media:", err);
          alert("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2>All Media</h2>
      <Link to="/media/upload" className="btn btn-secondary mb-3">
        + Upload New Media
      </Link>
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
              <td>{item.description}</td>
              <td>{new Date(item.uploaded_at).toLocaleString()}</td>
              <td>
                <Link to={`/media/${item.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
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
    </div>
  );
}
