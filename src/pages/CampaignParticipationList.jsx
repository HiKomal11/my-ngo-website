import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function CampaignParticipationList() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch participants
  const fetchParticipants = () => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/campaign-participation/`)
      .then((res) => {
        setParticipants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching participants:", err);
        setError("❌ Unable to load participants. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Delete participant (optional unsubscribe)
  const handleDelete = (id) => {
    if (window.confirm("Remove this participant from campaign?")) {
      axios
        .delete(`${BACKEND_URL}/api/campaign-participation/${id}/`)
        .then(() => {
          alert("✅ Participant removed successfully!");
          fetchParticipants(); // refresh list
        })
        .catch((err) => {
          console.error("Error deleting participant:", err);
          alert("❌ Something went wrong. Please try again.");
        });
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading participants...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">👥 Campaign Participants</h2>
      {participants.length === 0 ? (
        <p>No participants have joined any campaigns yet.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Campaign</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/campaigns/${p.campaign.id}`}
                    className="text-decoration-none fw-semibold"
                  >
                    {p.campaign.title}
                  </Link>
                </td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>
                  {p.joined_at
                    ? new Date(p.joined_at).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Remove
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
