import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OurWork() {
  const [workAreas, setWorkAreas] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);

 useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/work/")
    .then(res => {
      const formatted = res.data.map(area => ({
        title: area.title,
        description: area.description,
        details: area.details,
        image: area.image?.startsWith("/media/")
          ? `http://127.0.0.1:8000${area.image}`
          : area.image,
      }));
      // Merge API + fallback so page never empty
      setWorkAreas([
        ...formatted,
        {
          title: "Education Programs",
          description: "Providing access to schooling, materials, and mentorship.",
          details: "We run after-school programs, distribute learning kits, and connect children with mentors.",
          image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Healthcare Initiatives",
          description: "Health camps, mobile medical units, and preventive care.",
          details: "Our healthcare team conducts regular camps, provides free medicines, and spreads awareness.",
          image: "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Livelihood Programs",
          description: "Vocational training and income generation opportunities.",
          details: "We offer skill development workshops, microfinance support, and connect trainees with employers.",
          image: "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
        },
      ]);
    })
    .catch(err => {
      console.error("Error fetching work areas:", err);
      // Only fallback if API fails
      setWorkAreas([
        {
          title: "Education Programs",
          description: "Providing access to schooling, materials, and mentorship.",
          details: "We run after-school programs, distribute learning kits, and connect children with mentors.",
          image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Healthcare Initiatives",
          description: "Health camps, mobile medical units, and preventive care.",
          details: "Our healthcare team conducts regular camps, provides free medicines, and spreads awareness.",
          image: "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Livelihood Programs",
          description: "Vocational training and income generation opportunities.",
          details: "We offer skill development workshops, microfinance support, and connect trainees with employers.",
          image: "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
        },
      ]);
    });
}, []);


  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center"> Our Work</h2>
      <div className="row g-4">
        {workAreas.map((area, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img src={area.image} alt={area.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{area.title}</h5>
                <p className="card-text text-truncate">{area.description}</p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
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
      <div className="modal fade" id="workModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedWork && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedWork.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <img src={selectedWork.image} alt={selectedWork.title} className="img-fluid mb-3" />
                  <p>{selectedWork.details || selectedWork.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
