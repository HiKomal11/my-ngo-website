import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import About from "./pages/AboutUs";
import Work from "./pages/OurWork";
import Projects from "./pages/Projects";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/ContactUs";
import DonatePage from "./pages/DonatePage";
import DonationsList from "./components/DonationsList";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import VolunteerForm from "./pages/VolunteerForm";
import PartnerForm from "./pages/PartnerForm";
import FundraiseForm from "./pages/FundraiseForm";
import CampaignsPage from "./pages/CampaignsPage";
import CommunitySubscribe from "./pages/CommunitySubscribe";
import SubscriptionList from "./pages/SubscriptionList";
import Dashboard from "./pages/Dashboard";
import CampaignJoinForm from "./pages/CampaignJoinForm";
import CampaignParticipationList from "./pages/CampaignParticipationList";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignCreateForm from "./pages/CampaignCreateForm";
import CampaignList from "./pages/CampaignList";
import Media from "./pages/Media";
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
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/partner" element={<PartnerForm />} />
            <Route path="/fundraise" element={<FundraiseForm />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id/join" element={<CampaignJoinForm />} />
            <Route path="/campaign-participants" element={<CampaignParticipationList />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/create" element={<CampaignCreateForm />} />
            <Route path="/campaigns/list" element={<CampaignList />} />
            <Route path="/subscribe" element={<CommunitySubscribe />} />
            <Route path="/subscribers" element={<SubscriptionList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donations" element={<DonationsList />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/media" element={<Media />} />
            <Route path="/media/upload" element={<MediaUploadForm />} />
            <Route path="/media/list" element={<MediaList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
