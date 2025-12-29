import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function SubscriptionList() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  // Fetch subscribers
  const fetchSubscribers = () => {
    setLoading(true);
    setFeedback("");
    axios
      .get(`${BACKEND_URL}/api/subscribe/`)
      .then((res) => {
        setSubscribers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subscribers:", err);
        setFeedback("⚠️ Unable to load subscribers. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to unsubscribe this user?")) {
      axios
        .delete(`${BACKEND_URL}/api/subscribe/${id}/`)
        .then(() => {
          setFeedback("✅ Subscriber removed successfully!");
          fetchSubscribers(); // refresh list
        })
        .catch((err) => {
          console.error("Error deleting subscriber:", err);
          setFeedback("❌ Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4"> Newsletter Subscribers</h2>

      {feedback && <div className="alert alert-info">{feedback}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading subscribers...</p>
        </div>
      ) : subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
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
                <td>
                  {sub.subscribed_at
                    ? new Date(sub.subscribed_at).toLocaleString()
                    : "Unknown"}
                </td>
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
      )}
    </div>
  );
}
