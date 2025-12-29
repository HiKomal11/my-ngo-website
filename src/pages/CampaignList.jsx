import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCampaigns = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      axios
        .delete(`${BACKEND_URL}/api/campaigns/${id}/`)
        .then(() => {
          alert("✅ Campaign deleted successfully!");
          fetchCampaigns();
        })
        .catch((err) => {
          console.error("Error deleting campaign:", err);
          alert("❌ Something went wrong. Please try again.");
        });
    }
  };

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
      <h2 className="fw-bold text-primary mb-4"> All Campaigns</h2>
      <Link to="/campaigns/create" className="btn btn-success mb-3">
        + Create New Campaign
      </Link>

      {campaigns.length === 0 ? (
        <p>No campaigns available. Start by creating one!</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/campaigns/${c.id}`}
                    className="text-decoration-none fw-semibold"
                  >
                    {c.title}
                  </Link>
                </td>
                <td>{c.description || "No description provided"}</td>
                <td>
                  {c.created_at
                    ? new Date(c.created_at).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  <Link
                    to={`/campaigns/${c.id}/edit`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.id)}
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
