import axios from "axios";

// Centralized API configuration
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api", // keep /api here
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------- Authentication -------------------

export const registerUser = async (userData) => {
  try {
    // ✅ Correct endpoint
    const response = await api.post("/register/", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    // ✅ Correct endpoint
    const response = await api.post("/login/", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // ✅ Backend expects POST for logout
    const response = await api.post("/logout/");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Blogs -------------------

export const getBlogs = async () => {
  try {
    const response = await api.get("/blog/");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Donations -------------------

export const getDonations = async () => {
  try {
    const response = await api.get("/donations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Contact -------------------

export const submitContactForm = async (data) => {
  try {
    const response = await api.post("/contact/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Volunteer -------------------

export const volunteerSignup = async (data) => {
  try {
    const response = await api.post("/volunteers/", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up volunteer:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Partner -------------------

export const partnerInquiry = async (data) => {
  try {
    const response = await api.post("/partner-inquiries/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting partner inquiry:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Fundraise -------------------

export const createFundraiseCampaign = async (data) => {
  try {
    const response = await api.post("/campaigns/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Subscriptions -------------------

export const getSubscribers = async () => {
  try {
    const response = await api.get("/subscribe/");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error.response?.data || error.message);
    throw error;
  }
};

export const addSubscriber = async (data) => {
  try {
    const response = await api.post("/subscribe/", data);
    return response.data;
  } catch (error) {
    console.error("Error adding subscriber:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    await api.delete(`/subscribe/${id}/`);
    return true;
  } catch (error) {
    console.error("Error deleting subscriber:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Campaign Participation -------------------

export const participateInProject = async (data) => {
  try {
    const response = await api.post("/campaign-participation/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting participation:", error.response?.data || error.message);
    throw error;
  }
};
