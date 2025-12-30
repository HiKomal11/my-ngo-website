import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// ✅ Authentication
export const registerUser = (data) => api.post("/api/register/", data);
export const loginUser = (data) => api.post("/api/login/", data);
export const logoutUser = () => api.post("/api/logout/");
export const authStatus = () => api.get("/api/auth/status/");

// ✅ Blogs
export const getBlogs = () => api.get("/api/blog/");
export const getBlogDetail = (id) => api.get(`/api/blog/${id}/`);

// ✅ Donations
export const getDonations = () => api.get("/api/donations/");

// ✅ Contact
export const submitContactForm = (data) => api.post("/api/contact/", data);

// ✅ Volunteers
export const volunteerSignup = (data) => api.post("/api/volunteers/", data);

// ✅ Partner Inquiries
export const partnerInquiry = (data) => api.post("/api/partner-inquiries/", data);

// ✅ Fundraise Campaigns
export const createFundraiseCampaign = (data) => api.post("/api/campaigns/", data);

// ✅ Subscriptions
export const getSubscribers = () => api.get("/api/subscribe/");
export const addSubscriber = (data) => api.post("/api/subscribe/", data);
export const deleteSubscriber = (id) => api.delete(`/api/subscribe/${id}/`);

// ✅ Campaign Participation
export const participateInProject = (data) =>
  api.post("/api/campaign-participation/", data);

// ✅ Media (optional if you need uploads)
export const getMedia = () => api.get("/api/media/");
export const uploadMedia = (data) => api.post("/api/media/", data);
