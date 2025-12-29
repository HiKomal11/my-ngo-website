import axios from "axios";

// Centralized API configuration
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------- Public APIs -------------------

// Fetch blogs
export const getBlogs = async () => {
  try {
    const response = await api.get("/api/blogs/");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch donations
export const getDonations = async () => {
  try {
    const response = await api.get("/api/donations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error.response?.data || error.message);
    throw error;
  }
};

// Submit contact form
export const submitContactForm = async (data) => {
  try {
    const response = await api.post("/api/contact/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Volunteer -------------------

export const volunteerSignup = async (data) => {
  try {
    const response = await api.post("/api/volunteers/", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up volunteer:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Partner -------------------

export const partnerInquiry = async (data) => {
  try {
    const response = await api.post("/api/partner-inquiries/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting partner inquiry:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Fundraise -------------------

export const createFundraiseCampaign = async (data) => {
  try {
    const response = await api.post("/api/campaigns/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Subscriptions -------------------

export const getSubscribers = async () => {
  try {
    const response = await api.get("/api/subscribe/");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error.response?.data || error.message);
    throw error;
  }
};

export const addSubscriber = async (data) => {
  try {
    const response = await api.post("/api/subscribe/", data);
    return response.data;
  } catch (error) {
    console.error("Error adding subscriber:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    await api.delete(`/api/subscribe/${id}/`);
    return true;
  } catch (error) {
    console.error("Error deleting subscriber:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Campaign Participation -------------------

export const participateInProject = async (data) => {
  try {
    const response = await api.post("/api/participations/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting participation:", error.response?.data || error.message);
    throw error;
  }
};
