import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

// Example: fetch blogs
export const getBlogs = () => axios.get(`${API_BASE}/api/blogs/`);

// Example: fetch donations
export const getDonations = () => axios.get(`${API_BASE}/api/donations/`);

// Example: submit contact form
export const submitContactForm = (data) =>
  axios.post(`${API_BASE}/api/contact/`, data);

// Example: volunteer signup
export const volunteerSignup = (data) =>
  axios.post(`${API_BASE}/api/volunteer/`, data);
