import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        {icon && <div className="me-3">{icon}</div>}
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <div className="h5 mb-0">{value}</div>
        </div>
      </div>
    </div>
  );
}
