import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function AboutUs() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fallback content
  const fallbackAbout = {
    mission: "To create a lasting impact by providing education, women empowerment, and livelihood opportunities.",
    vision: "A world where every child has access to quality education, healthcare, and the opportunity to reach their full potential.",
    history: [
      { year: "2015", event: "Founded with a focus on education." },
      { year: "2018", event: "Expanded to mobile health units." },
      { year: "2022", event: "Launched vocational training programs." },
    ],
  };

  const fallbackTeam = [
    {
      name: "Amit Kumar",
      role: "Founder & Director",
      bio: "Leads the organization with a vision for education and empowerment.",
    },
    {
      name: "Priya Singh",
      role: "Program Manager",
      bio: "Coordinates healthcare and livelihood programs across communities.",
    },
    {
      name: "Ravi Patel",
      role: "Community Coordinator",
      bio: "Connects volunteers and beneficiaries, focusing on grassroots impact.",
    },
  ];

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/api/about/`).catch(() => ({ data: fallbackAbout })),
      axios.get(`${BACKEND_URL}/api/team/`).catch(() => ({ data: fallbackTeam })),
    ])
      .then(([aboutRes, teamRes]) => {
        setAbout(aboutRes.data);
        const formatted = teamRes.data.map((member) => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image?.startsWith("/media/")
            ? `${BACKEND_URL}${member.image}`
            : member.image || null,
        }));
        setTeam(formatted);
      })
      .catch(() => setError("❌ Unable to load About Us content."))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/join-team/`, formData)
      .then(() => {
        alert(`✅ Thank you, ${formData.name}! Your application has been submitted.`);
        setFormData({ name: "", email: "", role: "" });
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("❌ Something went wrong. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading About Us...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">About Us</h2>

      {/* Mission */}
      <section className="mb-5">
        <h3 className="h5 text-primary">Mission</h3>
        <p>{about.mission}</p>
      </section>

      {/* Vision */}
      <section className="mb-5">
        <h3 className="h5 text-success">Vision</h3>
        <p>{about.vision}</p>
      </section>

      {/* History */}
      <section className="mb-5">
        <h3 className="h5 text-warning">Our Journey</h3>
        <ul className="list-group">
          {about.history.map((h, idx) => (
            <li key={idx} className="list-group-item">
              <strong>{h.year}</strong> — {h.event}
            </li>
          ))}
        </ul>
      </section>

      {/* Team */}
      <section className="mb-5">
        <h3 className="h5 text-danger">Meet Our Team</h3>
        <div className="row g-4 mt-3">
          {team.map((member, idx) => (
            <div className="col-12 col-md-4" key={idx}>
              <div className="card h-100 shadow-sm text-center">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/200x200?text=No+Image")
                    }
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                  <p className="card-text small">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Team Form */}
      <section>
        <h3 className="h5 text-info">Join Our Team</h3>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Role</label>
            <input
              type="text"
              className="form-control"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Volunteer, Coordinator"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}
