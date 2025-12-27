import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CampaignDetail() {
  const { id } = useParams(); // campaign ID from route
  const [campaign, setCampaign] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Fetch campaign details
    axios.get(`http://127.0.0.1:8000/api/campaigns/${id}/`)
      .then(res => setCampaign(res.data))
      .catch(err => console.error("Error fetching campaign:", err));

    // Fetch participants for this campaign
    axios.get("http://127.0.0.1:8000/api/campaign-participation/")
      .then(res => {
        const filtered = res.data.filter(p => p.campaign.id === parseInt(id));
        setParticipants(filtered);
      })
      .catch(err => console.error("Error fetching participants:", err));
  }, [id]);

  return (
    <div className="container py-5">
      {campaign ? (
        <>
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>

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
                    <td>{new Date(p.joined_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No participants yet.</p>
          )}
        </>
      ) : (
        <p>Loading campaign details...</p>
      )}
    </div>
  );
}
