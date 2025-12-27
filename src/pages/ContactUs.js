import React from "react";
import ContactForm from "../components/ContactForm";

export default function ContactUs() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Contact Us</h2>
      <div className="row g-4">
        {/* Left side: Contact Form */}
        <div className="col-md-6">
          <ContactForm />
        </div>

        {/* Right side: Office Info + Map */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="mb-2">Our Office</h6>
              <p className="small mb-3">Mumbai, Maharashtra</p>

              {/* Google Maps Embed */}
              <div className="ratio ratio-4x3">
                <iframe
                  title="NGO Office Map"
                  src="https://www.google.com/maps?q=Mumbai,+Maharashtra&output=embed"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Contact Info */}
              <div className="mt-3 small">
                <div>📞 Phone: +91-XXXXXXXXXX</div>
                <div>📧 Email: info@ngo.org</div>
                <div>
                  🌐 Social: 
                  <a href="https://facebook.com" target="_blank" rel="noreferrer"> Facebook</a> · 
                  <a href="https://twitter.com" target="_blank" rel="noreferrer"> X/Twitter</a> · 
                  <a href="https://instagram.com" target="_blank" rel="noreferrer"> Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
