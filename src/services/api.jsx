import axios from "axios";

// Centralized API instance
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// ==================== AUTHENTICATION ====================
export const registerUser = (data) => api.post("/register/", data);
export const loginUser = (data) => api.post("/login/", data);
export const logoutUser = () => api.post("/logout/");
export const authStatus = () => api.get("/auth/status/");

// ==================== BLOGS ====================
export const getBlogs = () => api.get("/blog/");
export const getBlogDetail = (id) => api.get(`/blog/${id}/`);

// ==================== DONATIONS ====================
export const getDonations = () => api.get("/donations/");

// ==================== CONTACT ====================
export const submitContactForm = (data) => api.post("/contact/", data);

// ==================== VOLUNTEERS ====================
export const volunteerSignup = (data) => api.post("/volunteers/", data);

// ==================== PARTNER INQUIRIES ====================
export const partnerInquiry = (data) => api.post("/partner-inquiries/", data);

// ==================== FUNDRAISE CAMPAIGNS ====================
export const createFundraiseCampaign = (data) => api.post("/campaigns/", data);

// ==================== SUBSCRIPTIONS ====================
export const getSubscribers = () => api.get("/subscribe/");
export const addSubscriber = (data) => api.post("/subscribe/", data);
export const deleteSubscriber = (id) => api.delete(`/subscribe/${id}/`);

// ==================== CAMPAIGN PARTICIPATION ====================
export const participateInProject = (data) =>
  api.post("/campaign-participation/", data);

// ==================== MEDIA ====================
export const getMedia = () => api.get("/media/");
export const uploadMedia = (data) => api.post("/media/", data);
