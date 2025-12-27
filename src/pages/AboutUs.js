import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AboutUs() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

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
    axios.get("http://127.0.0.1:8000/api/about/")
      .then(res => setAbout(res.data))
      .catch(() => setAbout(fallbackAbout));

    axios.get("http://127.0.0.1:8000/api/team/")
      .then(res => {
        const formatted = res.data.map(member => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image?.startsWith("/media/")
            ? `http://127.0.0.1:8000${member.image}`
            : member.image,
        }));
        setTeam(formatted);
      })
      .catch(() => setTeam(fallbackTeam));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/join-team/", formData)
      .then(() => {
        alert(`Thank you, ${formData.name}! Your application has been submitted.`);
        setFormData({ name: "", email: "", role: "" });
      })
      .catch(err => {
        console.error("Error submitting form:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  if (!about) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center"> About Us</h2>

      {/* Mission */}
      <section className="mb-5">
        <h3 className="h5 text-primary"> Mission</h3>
        <p>{about.mission}</p>
      </section>

      {/* Vision */}
      <section className="mb-5">
        <h3 className="h5 text-success"> Vision</h3>
        <p>{about.vision}</p>
      </section>

      {/* History */}
      <section className="mb-5">
        <h3 className="h5 text-warning"> Our Journey</h3>
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
        <h3 className="h5 text-danger"> Meet Our Team</h3>
        <div className="row g-4 mt-3">
        {team.map((member, idx) => (
        <div className="col-12 col-md-4" key={idx}>
        <div className="card h-100 shadow-sm text-center">
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
        <h3 className="h5 text-info"> Join Our Team</h3>
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
          <button type="submit" className="btn btn-primary">Submit Application</button>
        </form>
      </section>
    </div>
  );
}
