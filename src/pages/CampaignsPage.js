import React from "react";
import { Link } from "react-router-dom";
export default function CampaignsPage() {
  // For now, static examples. Replace with API fetch later.
  const campaigns = [
    { id: 1, title: "Girls' Education Awareness", description: "Join our campaign to promote education for girls in rural areas." },
    { id: 2, title: "Health & Nutrition Drive", description: "Help spread awareness about nutrition and healthcare access." }
  ];

  return (
    <div className="container py-5">
      <h2>Ongoing Campaigns</h2>
      <div className="row g-3 mt-4">
        {campaigns.map(c => (
          <div key={c.id} className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <h5>{c.title}</h5>
              <p>{c.description}</p>
              <button className="btn btn-outline-secondary btn-sm">
              <Link to={`/campaigns/${c.id}/join`} className="text-decoration-none">
                Join Campaign
              </Link>
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
