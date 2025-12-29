import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function DonatePage() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Razorpay
  const donateWithRazorpay = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/payments/razorpay/create-order/`,
        {
          donor_name: donorName,
          donor_email: donorEmail,
          amount,
        }
      );

      const { order } = res.data;
      if (!order || !order.id) {
        setMessage("❌ Invalid Razorpay order response.");
        return;
      }

      if (!window.Razorpay) {
        setMessage("❌ Razorpay SDK not loaded. Please check index.html script tag.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NGO Donation",
        description: "Donation Payment",
        order_id: order.id,
        handler: function (response) {
          setMessage("✅ Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: { name: donorName, email: donorEmail },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setMessage("❌ Error creating Razorpay order.");
    } finally {
      setLoading(false);
    }
  };

  // Stripe
  const donateWithStripe = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BACKEND_URL}/api/payments/stripe/create-order/`, {
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
      });

      const { sessionId } = res.data;
      if (!sessionId) {
        setMessage("❌ Invalid Stripe session response.");
        return;
      }

      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) setMessage("❌ Stripe redirect failed: " + result.error.message);
    } catch (err) {
      console.error("Stripe error:", err);
      setMessage("❌ Error creating Stripe session.");
    } finally {
      setLoading(false);
    }
  };

  // PayPal
  const donateWithPayPal = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BACKEND_URL}/api/payments/paypal/create-order/`, {
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
      });

      const { order } = res.data;
      const approvalUrl = order.links.find((link) => link.rel === "approve")?.href;
      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        setMessage("❌ Invalid PayPal order response.");
      }
    } catch (err) {
      console.error("PayPal error:", err);
      setMessage("❌ Error creating PayPal order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4 text-center"> Donate</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                required
              />
            </div>
          </form>

          <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={donateWithStripe}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
            <button
              className="btn btn-dark"
              onClick={donateWithRazorpay}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with Razorpay"}
            </button>
            <button
              className="btn btn-warning"
              onClick={donateWithPayPal}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with PayPal"}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="alert alert-info mt-3 text-center">{message}</div>
      )}

      <div className="alert alert-light border mt-3 text-center">
         Secure payments powered by Stripe, Razorpay, and PayPal.  
        After donation, you’ll receive an acknowledgment and can share your support.
      </div>
    </div>
  );
}
