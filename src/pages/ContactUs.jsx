import React from "react";
import ContactForm from "../components/ContactForm";

export default function ContactUs() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4"> Contact Us</h2>
      <div className="row g-4">
        {/* Left side: Contact Form */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Send Us a Message</h5>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Right side: Office Info + Map */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Our Office</h5>
              <p className="small text-muted mb-3">Mumbai, Maharashtra</p>

              {/* Google Maps Embed */}
              <div className="ratio ratio-4x3 mb-3">
                <iframe
                  title="NGO Office Map"
                  src="https://www.google.com/maps?q=Mumbai,+Maharashtra&output=embed"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Contact Info */}
              <div className="small">
                <p className="mb-2">
                   <strong>Phone:</strong> +91-XXXXXXXXXX
                </p>
                <p className="mb-2">
                   <strong>Email:</strong>{" "}
                  <a href="mailto:info@ngo.org" className="text-decoration-none">
                    info@ngo.org
                  </a>
                </p>
                <p className="mb-0">
                   <strong>Social:</strong>{" "}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none me-2"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none me-2"
                  >
                    X/Twitter
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    Instagram
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
