import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Django backend

export default function Donate() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("one-time");
  const [project, setProject] = useState("general");

  // Razorpay
  const donateWithRazorpay = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/payments/razorpay/create-order/`, {
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        type,
        project,
      });

      const { order } = res.data;
      if (!order || !order.id) {
        alert("Invalid Razorpay order response");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check index.html script tag.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // use env key
        amount: order.amount,
        currency: order.currency,
        name: "NGO Donation",
        description: `Donation for ${project}`,
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: { name: donorName, email: donorEmail },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      alert("Error creating Razorpay order");
    }
  };

  // Stripe
  const donateWithStripe = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/payments/stripe/create-order/`, {
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        type,
        project,
      });

      const { sessionId } = res.data;
      if (!sessionId) {
        alert("Invalid Stripe session response");
        return;
      }

      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) alert("Stripe redirect failed: " + result.error.message);
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Error creating Stripe session");
    }
  };

  // PayPal
  const donateWithPayPal = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/payments/paypal/create-order/`, {
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        type,
        project,
      });

      const { order } = res.data;
      const approvalUrl = order.links.find(link => link.rel === "approve").href;
      window.location.href = approvalUrl;
    } catch (err) {
      console.error("PayPal error:", err);
      alert("Error creating PayPal order");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center"> Donate</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Your Name</label>
              <input
                className="form-control"
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Your Email</label>
              <input
                className="form-control"
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Amount (₹)</label>
              <input
                className="form-control"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Support Project</label>
              <select className="form-select" value={project} onChange={(e) => setProject(e.target.value)}>
                <option value="general">General Fund</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="livelihood">Livelihood</option>
              </select>
            </div>
          </div>

          <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={donateWithStripe} disabled={!amount || !donorName || !donorEmail}>
              Pay with Stripe
            </button>
            <button className="btn btn-dark" onClick={donateWithRazorpay} disabled={!amount || !donorName || !donorEmail}>
              Pay with Razorpay
            </button>
            <button className="btn btn-warning" onClick={donateWithPayPal} disabled={!amount || !donorName || !donorEmail}>
              Pay with PayPal
            </button>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3 text-center">
        Secure payments powered by Stripe, Razorpay, and PayPal.  
        After donation, you’ll receive an acknowledgment and can share your support.
      </div>
    </div>
  );
}
