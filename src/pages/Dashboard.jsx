import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Admin Dashboard</h2>
      <p className="text-muted">Manage all NGO activities from one place.</p>

      <div className="row g-4 mt-4">
        {/* Volunteers */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Volunteers</h5>
            <p className="small">View and manage volunteer signups.</p>
            <div>
              <Link to="/volunteer" className="btn btn-primary btn-sm">
                Add Volunteer
              </Link>
              <Link
                to="/volunteers"
                className="btn btn-outline-primary btn-sm ms-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Partners</h5>
            <p className="small">Manage partnership inquiries.</p>
            <div>
              <Link to="/partner" className="btn btn-primary btn-sm">
                Add Partner
              </Link>
              <Link
                to="/partner-inquiries"
                className="btn btn-outline-primary btn-sm ms-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Fundraisers */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Fundraisers</h5>
            <p className="small">Start and track fundraising campaigns.</p>
            <div>
              <Link to="/fundraise" className="btn btn-secondary btn-sm">
                Create Campaign
              </Link>
              <Link
                to="/fundraisers"
                className="btn btn-outline-secondary btn-sm ms-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Campaigns */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Campaigns</h5>
            <p className="small">Join or manage advocacy campaigns.</p>
            <Link to="/campaigns" className="btn btn-outline-secondary btn-sm">
              View Campaigns
            </Link>
          </div>
        </div>

        {/* Subscribers */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Subscribers</h5>
            <p className="small">Manage newsletter subscriptions.</p>
            <div>
              <Link to="/subscribe" className="btn btn-success btn-sm">
                Add Subscriber
              </Link>
              <Link
                to="/subscribers"
                className="btn btn-outline-success btn-sm ms-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Donations */}
        <div className="col-md-4">
          <div className="card h-100 p-3 shadow-sm">
            <h5> Donations</h5>
            <p className="small">Track and manage donations.</p>
            <div>
              <Link to="/donate" className="btn btn-success btn-sm">
                Donate Now
              </Link>
              <Link
                to="/donations"
                className="btn btn-outline-success btn-sm ms-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
