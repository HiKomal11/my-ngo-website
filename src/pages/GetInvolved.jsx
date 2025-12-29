import React from "react";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4"> Get Involve</h2>
      <div className="row g-4">
        {/* Volunteer */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Volunteer</h5>
            <p className="text-muted">Sign up to volunteer for projects or events.</p>
            <Link to="/volunteer" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Partner */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Partner with Us</h5>
            <p className="text-muted">Corporate partnerships and sponsorship opportunities.</p>
            <Link to="/partner" className="btn btn-outline-primary btn-sm">
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Fundraise */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Fundraise</h5>
            <p className="text-muted">Start your own fundraising campaign.</p>
            <Link to="/fundraise" className="btn btn-outline-secondary btn-sm">
              Get Tools
            </Link>
          </div>
        </div>

        {/* Campaigns */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Campaigns</h5>
            <p className="text-muted">Join ongoing advocacy and awareness campaigns.</p>
            <Link to="/campaigns" className="btn btn-outline-secondary btn-sm">
              Participate
            </Link>
          </div>
        </div>

        {/* Community */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Join the Community</h5>
            <p className="text-muted">Subscribe to newsletters or attend events.</p>
            <Link to="/subscribe" className="btn btn-outline-success btn-sm">
              Subscribe
            </Link>
          </div>
        </div>

        {/* Donate */}
        <div className="col-md-6">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Donate</h5>
            <p className="text-muted">Support our projects and programs.</p>
            <Link to="/donate" className="btn btn-success btn-sm">
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
