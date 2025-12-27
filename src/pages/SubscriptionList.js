import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionList() {
  const [subscribers, setSubscribers] = useState([]);

  // Fetch subscribers
  const fetchSubscribers = () => {
    axios.get("http://127.0.0.1:8000/api/subscribe/")
      .then(res => setSubscribers(res.data))
      .catch(err => console.error("Error fetching subscribers:", err));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to unsubscribe this user?")) {
      axios.delete(`http://127.0.0.1:8000/api/subscribe/${id}/`)
        .then(() => {
          alert("Subscriber removed successfully!");
          fetchSubscribers(); // refresh list
        })
        .catch(err => {
          console.error("Error deleting subscriber:", err);
          alert("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2>Newsletter Subscribers</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subscribed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub, index) => (
            <tr key={sub.id}>
              <td>{index + 1}</td>
              <td>{sub.name}</td>
              <td>{sub.email}</td>
              <td>{new Date(sub.subscribed_at).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(sub.id)}
                >
                  Unsubscribe
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
