import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Public Pages
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
import Dashboard from "./pages/Dashboard";
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

// Extra Components
import DonationsList from "./components/DonationsList";
import VolunteerPage from "./components/VolunteerPage";
import MediaUploadForm from "./components/MediaUploadForm";
import MediaList from "./components/MediaList";

import "./i18n";
import "./custom.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* NGO Branding */}
        <header className="text-center py-3 bg-primary text-light">
          <h1 className="m-0">Helping Hands Foundation</h1>
        </header>

        {/* Navigation Bar */}
        <NavBar />

        {/* Page Content */}
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/media" element={<Media />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/donate" element={<DonatePage />} />

            {/* Admin / Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/volunteer/form" element={<VolunteerForm />} />
            <Route path="/partner" element={<PartnerForm />} />
            <Route path="/fundraise" element={<FundraiseForm />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/create" element={<CampaignCreateForm />} />
            <Route path="/campaigns/list" element={<CampaignList />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/:id/join" element={<CampaignJoinForm />} />
            <Route path="/campaign-participants" element={<CampaignParticipationList />} />
            <Route path="/subscribe" element={<CommunitySubscribe />} />
            <Route path="/subscribers" element={<SubscriptionList />} />
            <Route path="/donations" element={<DonationsList />} />
            <Route path="/media/upload" element={<MediaUploadForm />} />
            <Route path="/media/list" element={<MediaList />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
