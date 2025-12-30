import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // wrapper

// Public Pages (only accessible after login)
import HomePage from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import OurWork from "./pages/OurWork";
import Projects from "./pages/Projects";
import Media from "./pages/Media";
import GetInvolved from "./pages/GetInvolved";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ContactUs from "./pages/ContactUs";
import DonatePage from "./pages/DonatePage";

// Admin / Forms
import Dashboard from "./pages/Dashboard";          // Admin Dashboard
import VolunteerForm from "./pages/VolunteerForm";
import PartnerForm from "./pages/PartnerForm";
import FundraiseForm from "./pages/FundraiseForm";
import SubscriptionList from "./pages/SubscriptionList";
import CampaignList from "./pages/CampaignList";
import CampaignParticipationList from "./pages/CampaignParticipationList";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignCreateForm from "./pages/CampaignCreateForm";
import CampaignJoinForm from "./pages/CampaignJoinForm";
import CampaignsPage from "./pages/CampaignsPage";
import CommunitySubscribe from "./pages/CommunitySubscribe";

// Authentication Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";  // User Dashboard

// Extra Components
import DonationsList from "./components/DonationsList";
import VolunteerPage from "./components/VolunteerPage";
import MediaUploadForm from "./components/MediaUploadForm";
import MediaList from "./components/MediaList";

import "./i18n";
import "./styles/theme-overrides.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<LoginPage />} /> {/* Default entry point */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path="/home" 
          element={
            <HomePage />
          }
        />  // ✅ should be public

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Layout><AboutUs /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/work"
          element={
            <ProtectedRoute>
              <Layout><OurWork /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Layout><Projects /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/media"
          element={
            <ProtectedRoute>
              <Layout><Media /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-involved"
          element={
            <ProtectedRoute>
              <Layout><GetInvolved /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Layout><BlogPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <Layout><BlogDetail /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Layout><ContactUs /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Layout><DonatePage /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <Layout><DashboardPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin / Forms */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Layout><VolunteerPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/form"
          element={
            <ProtectedRoute>
              <Layout><VolunteerForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner"
          element={
            <ProtectedRoute>
              <Layout><PartnerForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fundraise"
          element={
            <ProtectedRoute>
              <Layout><FundraiseForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Layout><CampaignsPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/create"
          element={
            <ProtectedRoute>
              <Layout><CampaignCreateForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/list"
          element={
            <ProtectedRoute>
              <Layout><CampaignList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/:id"
          element={
            <ProtectedRoute>
              <Layout><CampaignDetail /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/:id/join"
          element={
            <ProtectedRoute>
              <Layout><CampaignJoinForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign-participants"
          element={
            <ProtectedRoute>
              <Layout><CampaignParticipationList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscribe"
          element={
            <ProtectedRoute>
              <Layout><CommunitySubscribe /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscribers"
          element={
            <ProtectedRoute>
              <Layout><SubscriptionList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <Layout><DonationsList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/media/upload"
          element={
            <ProtectedRoute>
              <Layout><MediaUploadForm /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/media/list"
          element={
            <ProtectedRoute>
              <Layout><MediaList /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

/* Layout wrapper to avoid repeating header/nav/footer */
function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="text-center py-3 bg-primary text-light">
        <h1 className="m-0">Helping Hands Foundation</h1>
      </header>
      <NavBar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
