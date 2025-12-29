import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackCampaigns = [
    {
      title: "Education Drive",
      description: "Providing learning opportunities for underprivileged children.",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
      details:
        "This campaign focuses on building schools, providing books, and training teachers in rural areas.",
    },
    {
      title: "Mobile Health Units",
      description: "Bringing healthcare to rural communities.",
      image:
        "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
      details:
        "Our mobile vans travel to villages offering free checkups, medicines, and health awareness programs.",
    },
    {
      title: "Skill Training",
      description: "Empowering youth and women with vocational skills.",
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
      details:
        "We provide training in tailoring, computer literacy, and other skills to help secure livelihoods.",
    },
  ];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/campaigns/`)
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setCampaigns(fallbackCampaigns);
        setError("⚠️ Unable to load live campaigns. Showing fallback data.");
        setLoading(false);
      });
  }, []);

  const openInfoModal = (campaign) => {
    setSelectedCampaign(campaign);
    const modalEl = document.getElementById("infoModal");
    if (modalEl && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary"> Creating Lasting Impact</h1>
        <p className="lead text-muted">
          Education, healthcare, and livelihood opportunities for underprivileged communities.
        </p>
      </section>

      {/* Impact Highlights */}
      <section className="row text-center mb-5">
        <div className="col-md-4">
          <h2 className="fw-bold text-success">10,000+</h2>
          <p>Children Educated</p>
        </div>
        <div className="col-md-4">
          <h2 className="fw-bold text-info">250+</h2>
          <p>Health Camps Held</p>
        </div>
        <div className="col-md-4">
          <h2 className="fw-bold text-warning">5,000+</h2>
          <p>Women Empowered</p>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section>
        <h2 className="mb-4 text-center fw-bold"> Featured Campaigns</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading campaigns...</p>
          </div>
        ) : (
          <div className="row g-4">
            {(campaigns.length ? campaigns : fallbackCampaigns).map((c, idx) => (
              <div className="col-12 col-md-4" key={idx}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x200?text=Image+Unavailable")
                    }
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{c.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {c.description}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-primary mt-auto"
                      onClick={() => openInfoModal(c)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-warning text-center mt-3">{error}</p>}
      </section>

      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedCampaign?.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedCampaign && (
                <>
                  <img
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    className="img-fluid mb-3 rounded"
                  />
                  <p>
                    <strong>Description:</strong> {selectedCampaign.description}
                  </p>
                  {selectedCampaign.details && (
                    <p>
                      <strong>Details:</strong> {selectedCampaign.details}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
