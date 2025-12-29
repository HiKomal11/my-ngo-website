import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function MediaHub() {
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/media/`)
      .then((res) => setMediaItems(res.data))
      .catch((err) => {
        console.error("Error fetching media:", err);
        setError("❌ Unable to load media items. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🎥 Media Hub</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {mediaItems.length === 0 && !error ? (
          <p className="text-center">No media available yet.</p>
        ) : (
          mediaItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                {item.type === "photo" && item.image && (
                  <img
                    src={`${BACKEND_URL}${item.image}`}
                    alt={item.title}
                    className="card-img-top"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Unavailable";
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text small text-muted">
                    {item.description || "No description provided"}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View More
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
