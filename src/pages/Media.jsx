import React, { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function Media() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preloaded fallback content
  const fallbackItems = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1588776814546-ec7d3f3f3f3d?auto=format&fit=crop&w=600&q=80",
      title: "Health Camp",
      caption: "Free medical checkups in rural Karnataka villages",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1509099836639-18ba106728d4?auto=format&fit=crop&w=600&q=80",
      title: "Green Initiative",
      caption: "Volunteers planting trees for a cleaner tomorrow",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
      title: "Education Drive",
      caption: "Empowering children through learning in underserved communities",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/ADDj5XYa-jY",
      title: "Child Welfare Campaign",
      caption: "Creating safe spaces for vulnerable children",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/Clh9O-CjtuM",
      title: "Environment Awareness Drive",
      caption: "Delhi NGO campaign for a greener future",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/h9fkWgW_kWs",
      title: "Plastic-Free Initiative",
      caption: "Dhruvansh NGO campaign against plastic use",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/SIfX3qJYqMU",
      title: "Cancer Awareness Drive",
      caption: "Educating communities about early detection and prevention",
    },
    {
      type: "press",
      src: "https://www.thebetterindia.com/press-release-ngo-health-drive",
      title: "NGO Featured in Better India",
      caption: "Coverage of our health and hygiene campaign",
    },
    {
      type: "blog",
      src: "https://www.smilefoundationindia.org/education/",
      title: "2025 Impact Report",
      caption: "Stories of transformation from our field teams",
    },
  ];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/media/`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          type: item.type === "photo" ? "image" : item.type,
          src:
            item.type === "photo"
              ? `${BACKEND_URL}${item.image}`
              : item.url,
          title: item.title,
          caption: item.description,
        }));
        setItems([...formatted, ...fallbackItems]); // merge API + fallback
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching media:", err);
        setItems(fallbackItems); // fallback only if API fails
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading media showcase...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4 text-center">Media Showcase</h2>

      {/* Photos */}
      <section className="mb-5">
        <h3 className="h5 text-primary">Photos</h3>
        <Gallery items={items.filter((i) => i.type === "image")} />
      </section>

      {/* Videos */}
      <section className="mb-5">
        <h3 className="h5 text-danger">Videos</h3>
        <Gallery items={items.filter((i) => i.type === "video")} />
      </section>

      {/* Press Releases */}
      <section className="mb-5">
        <h3 className="h5 text-success">Press Releases</h3>
        <ul className="list-group">
          {items.filter((i) => i.type === "press").map((press, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {press.title}
              <a
                href={press.src}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Electronic Media */}
      <section>
        <h3 className="h5 text-warning">Electronic Media</h3>
        <ul className="list-group">
          {items.filter((i) => i.type === "blog").map((blog, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {blog.title}
              <a
                href={blog.src}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                Read
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
