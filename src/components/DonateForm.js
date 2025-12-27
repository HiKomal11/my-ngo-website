import React, { useState } from "react";

function DonateForm() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState(500);

  const handleDonate = async () => {
    if (!donorName || !donorEmail || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/donations/razorpay/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: donorName,
          donor_email: donorEmail,
          amount: amount,
        }),
      });

      const data = await res.json();
      console.log("Order created:", data);

      const { order } = data;
      if (!order || !order.id) {
        alert("Invalid Razorpay order response");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check index.html script tag.");
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
          alert("Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: { name: donorName, email: donorEmail },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error:", err);
      alert("Error creating Razorpay order");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3"> Donate</h2>
      <div className="mb-3">
        <label className="form-label">Your Name</label>
        <input
          type="text"
          className="form-control"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Email</label>
        <input
          type="email"
          className="form-control"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount (₹)</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
      </div>
      <button className="btn btn-primary" onClick={handleDonate}>
        Donate Now
      </button>
    </div>
  );
}

export default DonateForm;
