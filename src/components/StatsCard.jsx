import React from "react";

export default function StatsCard({ title, value, icon, color = "primary", footer }) {
  return (
    <div className={`card shadow-sm h-100 border-${color}`}>
      <div className="card-body d-flex align-items-center">
        {icon && (
          <div className={`me-3 text-${color}`} aria-hidden="true">
            {icon}
          </div>
        )}
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <div
            className={`h5 mb-0 text-${color}`}
            aria-label={`${title}: ${value}`}
          >
            {value}
          </div>
          {footer && <small className="text-muted">{footer}</small>}
        </div>
      </div>
    </div>
  );
}
