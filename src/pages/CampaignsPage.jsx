import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/campaigns/`)
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setError("❌ Unable to load campaigns. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading campaigns...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">📢 Ongoing Campaigns</h2>
      <div className="row g-4 mt-4">
        {campaigns.length === 0 ? (
          <p>No campaigns available at the moment.</p>
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-semibold">{c.title}</h5>
                  <p className="text-muted flex-grow-1">
                    {c.description || "No description provided"}
                  </p>
                  <div className="d-flex justify-content-between mt-auto">
                    <Link
                      to={`/campaigns/${c.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/campaigns/${c.id}/join`}
                      className="btn btn-outline-success btn-sm"
                    >
                      Join Campaign
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
