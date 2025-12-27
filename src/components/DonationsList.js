import React, { useEffect, useState } from "react";
import axios from "axios";

function DonationsList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/payments/donations/")
      .then(response => setDonations(response.data))
      .catch(error => console.error("Error fetching donations:", error));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">🙏 Recent Donations</h2>
      {donations.length === 0 ? (
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
            {donations.map(donation => (
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
