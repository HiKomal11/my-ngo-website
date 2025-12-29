import axios from "axios";

// Centralized API configuration
const api = axios.create({
  // ✅ Use environment variable if available, otherwise fallback to your live backend
  baseURL: process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: fetch blogs
export const getBlogs = async () => {
  try {
    const response = await api.get("/api/blogs/");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Example: fetch donations
export const getDonations = async () => {
  try {
    const response = await api.get("/api/donations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw error;
  }
};

// Example: submit contact form
export const submitContactForm = async (data) => {
  try {
    const response = await api.post("/api/contact/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Example: volunteer signup
export const volunteerSignup = async (data) => {
  try {
    const response = await api.post("/api/volunteer/", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up volunteer:", error);
    throw error;
  }
};
