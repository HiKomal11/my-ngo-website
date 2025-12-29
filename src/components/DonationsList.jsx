import React, { useEffect, useState } from "react";
import { getDonations } from "../services/api"; // ✅ use centralized API

function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonations(); // ✅ calls backend via api.js
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("❌ Unable to load donations. Please try again later.");
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">🙏 Recent Donations</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {donations.length === 0 && !error ? (
        <p>No donations yet. Be the first to support!</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.donor_name}</td>
                <td>{donation.donor_email}</td>
                <td>₹{donation.amount}</td>
                <td>{donation.currency}</td>
                <td>{donation.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DonationsList;
