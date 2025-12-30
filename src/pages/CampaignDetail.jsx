import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function CampaignDetail() {
  const { id } = useParams(); // campaign ID from route
  const [campaign, setCampaign] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaign details
        const campaignRes = await axios.get(`${BACKEND_URL}/campaigns/${id}/`);
        setCampaign(campaignRes.data);

        // Fetch participants for this campaign
        const participantsRes = await axios.get(
          `${BACKEND_URL}/campaign-participation/`
        );
        const filtered = participantsRes.data.filter(
          (p) => p.campaign.id === parseInt(id)
        );
        setParticipants(filtered);
      } catch (err) {
        console.error("Error fetching campaign details:", err);
        setError("❌ Unable to load campaign details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading campaign details...</p>
      </div>
    );
  }

  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      {campaign ? (
        <>
          {/* Campaign Title */}
          <h2 className="fw-bold text-primary">{campaign.title}</h2>

          {/* Campaign Metadata */}
          <p className="text-muted">
            {campaign.start_date
              ? `Starts: ${new Date(campaign.start_date).toLocaleDateString()}`
              : ""}
            {campaign.end_date
              ? ` • Ends: ${new Date(campaign.end_date).toLocaleDateString()}`
              : ""}
          </p>

          {/* Campaign Image */}
          {campaign.image && (
            <img
              src={
                campaign.image.startsWith("/media/")
                  ? `${BACKEND_URL}${campaign.image}`
                  : campaign.image
              }
              alt={campaign.title}
              className="img-fluid rounded mb-4"
              style={{ maxHeight: "300px", objectFit: "cover" }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x300?text=Image+Unavailable")
              }
            />
          )}

          {/* Campaign Description */}
          <p>{campaign.description}</p>

          {/* Participants */}
          <h4 className="mt-4">Participants</h4>
          {participants.length > 0 ? (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>
                      {p.joined_at
                        ? new Date(p.joined_at).toLocaleString()
                        : "Unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No participants yet.</p>
          )}
        </>
      ) : (
        <p>Campaign not found.</p>
      )}
    </div>
  );
}
