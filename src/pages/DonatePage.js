import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Django backend

export default function DonatePage() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("");

  // Razorpay
  const donateWithRazorpay = async () => {
  try {
    const res = await axios.post(`${API_BASE}/api/payments/razorpay/create-order/`, {
      donor_name: donorName,
      donor_email: donorEmail,
      amount: amount,
    });

    console.log("Razorpay response:", res.data); // Debugging

    const { order } = res.data;

    if (!order || !order.id) {
      alert("Invalid Razorpay order response");
      return;
    }

    // Check if Razorpay script is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check index.html script tag.");
      return;
    }

    // 🔎 Add this log here to confirm your key is being read
    console.log("Razorpay Key from .env:", process.env.REACT_APP_RAZORPAY_KEY_ID);

    const options = {
     key: "rzp_test_RvRhxcMUHECjkq", // hardcoded for testing amount: order.amount,
      amount: order.amount, // amount in paise
      currency: order.currency,
      name: "NGO Donation",
      description: "Donation Payment",
      order_id: order.id,
      handler: function (response) {
        console.log("Payment response:", response);
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Optionally call verify_payment_razorpay endpoint here
      },
      prefill: {
        name: donorName,
        email: donorEmail,
      },
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
    const res = await axios.post("http://127.0.0.1:8000/api/payments/stripe/create-order/", {
      donor_name: donorName,
      donor_email: donorEmail,
      amount: amount,
    });

    console.log("Stripe response:", res.data);
    console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    const { sessionId } = res.data;  // ✅ matches backend
    if (!sessionId) {
      alert("Invalid Stripe session response");
      return;
    }

    const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
      alert("Stripe redirect failed: " + result.error.message);
    }
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
        amount: amount,
      });

      const { order } = res.data;
      const approvalUrl = order.links.find(link => link.rel === "approve").href;

      window.location.href = approvalUrl; // redirect user to PayPal checkout
    } catch (err) {
      console.error(err);
      alert("Error creating PayPal order");
    }
  };

  return (
    <div>
      <h2>Donate</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Your Email"
        value={donorEmail}
        onChange={(e) => setDonorEmail(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
      />
      <br />
      <button onClick={donateWithRazorpay}>Donate with Razorpay</button>
      <button onClick={donateWithStripe}>Donate with Stripe</button>
      <button onClick={donateWithPayPal}>Donate with PayPal</button>
    </div>
  );
}
