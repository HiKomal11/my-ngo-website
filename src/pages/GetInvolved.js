import React from "react";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <div>
      <h2>Get involve</h2>
      <div className="row g-3">
        {/* Volunteer */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Volunteer</h6>
            <p>Sign up to volunteer for projects or events.</p>
            <Link to="/volunteer" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </div>
        </div>

        {/* Partner */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Partner with us</h6>
            <p>Corporate partnerships and sponsorship opportunities.</p>
            <Link to="/partner" className="btn btn-outline-primary btn-sm">
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Fundraise */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Fundraise</h6>
            <p>Start your own fundraising campaign.</p>
            <Link to="/fundraise" className="btn btn-outline-secondary btn-sm">
              Get tools
            </Link>
          </div>
        </div>

        {/* Campaigns */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Campaigns</h6>
            <p>Join ongoing advocacy and awareness campaigns.</p>
            <Link to="/campaigns" className="btn btn-outline-secondary btn-sm">
              Participate
            </Link>
          </div>
        </div>

        {/* Community */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Join the community</h6>
            <p>Subscribe to newsletters or attend events.</p>
            <Link to="/subscribe" className="btn btn-outline-success btn-sm">
  Subscribe
</Link>

          </div>
        </div>

        {/* Donate */}
        <div className="col-md-6">
          <div className="card h-100 p-3">
            <h6>Donate</h6>
            <p>Support our projects and programs.</p>
            <a href="/donate" className="btn btn-success btn-sm">Donate now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
