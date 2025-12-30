import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Authentication
export const registerUser = (data) => api.post("/register/", data);
export const loginUser = (data) => api.post("/login/", data);
export const logoutUser = () => api.post("/logout/");
export const authStatus = () => api.get("/auth/status/");

// ✅ Blogs
export const getBlogs = () => api.get("/blog/");
export const getBlogDetail = (id) => api.get(`/blog/${id}/`);

// ✅ Donations
export const getDonations = () => api.get("/donations/");

// ✅ Contact
export const submitContactForm = (data) => api.post("//contact/", data);

// ✅ Volunteers
export const volunteerSignup = (data) => api.post("/volunteers/", data);

// ✅ Partner Inquiries
export const partnerInquiry = (data) => api.post("/partner-inquiries/", data);

// ✅ Fundraise Campaigns
export const createFundraiseCampaign = (data) => api.post("/campaigns/", data);

// ✅ Subscriptions
export const getSubscribers = () => api.get("/subscribe/");
export const addSubscriber = (data) => api.post("/subscribe/", data);
export const deleteSubscriber = (id) => api.delete(`/subscribe/${id}/`);

// ✅ Campaign Participation
export const participateInProject = (data) =>
  api.post("/campaign-participation/", data);

// ✅ Media (optional if you need uploads)
export const getMedia = () => api.get("/media/");
export const uploadMedia = (data) => api.post("/media/", data);
