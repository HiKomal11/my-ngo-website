import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import OurWork from "../pages/OurWork";
import Projects from "../pages/Projects";
import Media from "../pages/Media";
import GetInvolved from "../pages/GetInvolved";
import BlogPage from "../pages/BlogPage";
import BlogDetail from "../pages/BlogDetail";
import ContactUs from "../pages/ContactUs";
import Donate from "../pages/Donate";

// Admin / Forms
import Dashboard from "../pages/Dashboard";
import VolunteerForm from "../pages/VolunteerForm";
import PartnerForm from "../pages/PartnerForm";
import FundraiseForm from "../pages/FundraiseForm";
import SubscriptionList from "../pages/SubscriptionList";
import CampaignList from "../pages/CampaignList";
import CampaignParticipationList from "../pages/CampaignParticipationList";

// Layout Components
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <NavBar />
      <main className="container py-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/media" element={<Media />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />

          {/* Admin / Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/partner" element={<PartnerForm />} />
          <Route path="/fundraise" element={<FundraiseForm />} />
          <Route path="/subscribers" element={<SubscriptionList />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaign-participation" element={<CampaignParticipationList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
