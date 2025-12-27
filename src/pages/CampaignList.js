import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = () => {
    axios.get("http://127.0.0.1:8000/api/campaigns/")
      .then(res => setCampaigns(res.data))
      .catch(err => console.error("Error fetching campaigns:", err));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      axios.delete(`http://127.0.0.1:8000/api/campaigns/${id}/`)
        .then(() => {
          alert("Campaign deleted successfully!");
          fetchCampaigns();
        })
        .catch(err => {
          console.error("Error deleting campaign:", err);
          alert("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2>All Campaigns</h2>
      <Link to="/campaigns/create" className="btn btn-secondary mb-3">
        + Create New Campaign
      </Link>
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
                <Link to={`/campaigns/${c.id}`} className="text-decoration-none">
                  {c.title}
                </Link>
              </td>
              <td>{c.description}</td>
              <td>{new Date(c.created_at).toLocaleString()}</td>
              <td>
                <Link to={`/campaigns/${c.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
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
    </div>
  );
}
