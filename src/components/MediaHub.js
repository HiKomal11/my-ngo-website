import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MediaHub() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/media/")
      .then(res => setMediaItems(res.data))
      .catch(err => console.error("Error fetching media:", err));
  }, []);

  return (
    <div className="row g-3 mt-4">
      {mediaItems.map(item => (
        <div key={item.id} className="col-md-4">
          <div className="card h-100 shadow-sm">
            {item.type === "photo" && item.image && (
              <img
                 src={`http://127.0.0.1:8000${item.image}`}
                 alt={item.title}
                 className="card-img-top"
              />

            )}
            <div className="card-body">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                  View More
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
