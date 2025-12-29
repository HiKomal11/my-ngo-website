import React from "react";
import { Link } from "react-router-dom";

export default function VolunteerPage() {
  return (
    <div className="container py-5 text-center">
      {/* Hero Section */}
      <div className="mb-5">
        <h2 className="fw-bold text-primary mb-3"> Volunteer With Us</h2>
        <p className="lead text-muted">
          Join Helping Hands Foundation in creating lasting impact through education, healthcare,
          and livelihood opportunities. Your time and skills can change lives!
        </p>
      </div>

      {/* Call to Action */}
      <Link
        to="/volunteer/form"
        className="btn btn-success btn-lg shadow-sm px-4"
      >
        Register as a Volunteer
      </Link>

      {/* Extra Info */}
      <div className="mt-5 text-start">
        <h5 className="fw-semibold text-center mb-3">Why Volunteer?</h5>
        <ul className="list-unstyled">
          <li className="mb-2"> Make a difference in underprivileged communities</li>
          <li className="mb-2"> Share your skills and knowledge</li>
          <li className="mb-2"> Connect with like‑minded changemakers</li>
          <li className="mb-2"> Gain valuable experience and leadership opportunities</li>
        </ul>
      </div>
    </div>
  );
}
