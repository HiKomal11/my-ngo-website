import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function OurWork() {
  const [workAreas, setWorkAreas] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/work/`)
      .then((res) => {
        const formatted = res.data.map((area) => ({
          title: area.title,
          description: area.description,
          details: area.details,
          image: area.image?.startsWith("/media/")
            ? `${BACKEND_URL}${area.image}`
            : area.image,
        }));

        // Merge API + fallback so page never empty
        setWorkAreas([
          ...formatted,
          {
            title: "Education Programs",
            description: "Providing access to schooling, materials, and mentorship.",
            details:
              "We run after-school programs, distribute learning kits, and connect children with mentors.",
            image:
              "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
          },
          {
            title: "Healthcare Initiatives",
            description: "Health camps, mobile medical units, and preventive care.",
            details:
              "Our healthcare team conducts regular camps, provides free medicines, and spreads awareness.",
            image:
              "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
          },
          {
            title: "Livelihood Programs",
            description: "Vocational training and income generation opportunities.",
            details:
              "We offer skill development workshops, microfinance support, and connect trainees with employers.",
            image:
              "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching work areas:", err);
        setError("⚠️ Unable to load live work areas. Showing fallback content.");
        setWorkAreas([
          {
            title: "Education Programs",
            description: "Providing access to schooling, materials, and mentorship.",
            details:
              "We run after-school programs, distribute learning kits, and connect children with mentors.",
            image:
              "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
          },
          {
            title: "Healthcare Initiatives",
            description: "Health camps, mobile medical units, and preventive care.",
            details:
              "Our healthcare team conducts regular camps, provides free medicines, and spreads awareness.",
            image:
              "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
          },
          {
            title: "Livelihood Programs",
            description: "Vocational training and income generation opportunities.",
            details:
              "We offer skill development workshops, microfinance support, and connect trainees with employers.",
            image:
              "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading work areas...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4 text-center">💼 Our Work</h2>
      {error && <p className="text-warning text-center">{error}</p>}

      <div className="row g-4">
        {workAreas.map((area, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={area.image}
                alt={area.title}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "cover" }}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Unavailable")
                }
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{area.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {area.description}
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary mt-auto"
                  onClick={() => setSelectedWork(area)}
                  data-bs-toggle="modal"
                  data-bs-target="#workModal"
                >
                  Explore More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="workModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedWork && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedWork.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="img-fluid mb-3 rounded"
                  />
                  <p>{selectedWork.details || selectedWork.description}</p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
