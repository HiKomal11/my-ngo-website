import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  // Fallback sample projects
  const fallbackProjects = [
    {
      title: "Health Camp",
      description: "Free medical checkups in rural Karnataka villages.",
      image:
        "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Green Initiative",
      description: "Volunteers planting trees for a cleaner tomorrow.",
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Education Drive",
      description: "Empowering children through learning in underserved communities.",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
    },
  ];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/projects/`)
      .then((res) => {
        const formatted = res.data.map((p) => ({
          title: p.title,
          description: p.description,
          image: p.image?.startsWith("/media/")
            ? `${BACKEND_URL}${p.image}`
            : p.image,
        }));
        setProjects([...formatted, ...fallbackProjects]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects(fallbackProjects);
        setFeedback("⚠️ Unable to load live projects. Showing fallback content.");
        setLoading(false);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    try {
      await axios.post(`${BACKEND_URL}/api/participations/`, formData);
      setFeedback(
        `✅ Thank you, ${formData.name}! Your interest in ${formData.project} has been recorded.`
      );
      setFormData({ name: "", email: "", project: "" });
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      setFeedback("❌ Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4 text-center"> Our Projects</h2>
      {feedback && <p className="text-center text-info">{feedback}</p>}

      <div className="row g-4">
        {projects.map((proj, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={proj.image}
                alt={proj.title}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "cover" }}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Unavailable")
                }
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{proj.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {proj.description}
                </p>
                <div className="mt-auto">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedProject(proj)}
                    data-bs-toggle="modal"
                    data-bs-target="#learnMoreModal"
                  >
                    Learn More
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() =>
                      setFormData({ ...formData, project: proj.title })
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#joinDonateModal"
                  >
                    Join / Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learn More Modal */}
      <div
        className="modal fade"
        id="learnMoreModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedProject && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedProject.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="img-fluid mb-3 rounded"
                  />
                  <p>{selectedProject.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Join/Donate Modal */}
      <div
        className="modal fade"
        id="joinDonateModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Join / Donate</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Project</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.project}
                    readOnly
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
