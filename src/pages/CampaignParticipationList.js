import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignParticipationList() {
  const [participants, setParticipants] = useState([]);

  // Fetch participants
  const fetchParticipants = () => {
    axios.get("http://127.0.0.1:8000/api/campaign-participation/")
      .then(res => setParticipants(res.data))
      .catch(err => console.error("Error fetching participants:", err));
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Delete participant (optional unsubscribe)
  const handleDelete = (id) => {
    if (window.confirm("Remove this participant from campaign?")) {
      axios.delete(`http://127.0.0.1:8000/api/campaign-participation/${id}/`)
        .then(() => {
          alert("Participant removed successfully!");
          fetchParticipants(); // refresh list
        })
        .catch(err => {
          console.error("Error deleting participant:", err);
          alert("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2>Campaign Participants</h2>
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
                <Link to={`/campaigns/${p.campaign.id}`} className="text-decoration-none">
                  {p.campaign.title}
                </Link>
              </td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{new Date(p.joined_at).toLocaleString()}</td>
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
    </div>
  );
}
