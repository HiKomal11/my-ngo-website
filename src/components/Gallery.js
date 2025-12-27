import React from "react";

export default function Gallery({ items = [] }) {
  return (
    <div className="row g-3">
      {items.map((item, idx) => {
        // If src starts with /media/, prepend backend URL
        const isLocal = item.src?.startsWith("/media/");
        const fullSrc = isLocal ? `http://127.0.0.1:8000${item.src}` : item.src;

        return (
          <div className="col-12 col-sm-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm">
              {item.type === "image" ? (
                <img
                  src={fullSrc}
                  alt={item.alt || item.title || "Gallery"}
                  className="card-img-top"
                />
              ) : item.type === "video" ? (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={fullSrc}
                    title={item.alt || item.title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <a
                    href={fullSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View More
                  </a>
                </div>
              )}
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text small text-muted text-truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
