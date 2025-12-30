# Helping Hands Foundation – Frontend

This is the **React frontend** for the Helping Hands Foundation NGO platform.  
It provides the user interface for registration, login, donations, volunteering, campaigns, and more.

## Features
- User Registration & Login
- Role-based redirection (Admin/User)
- Protected routes using React Router v6
- Donations via Stripe, Razorpay, PayPal
- Volunteer & Partner Inquiry forms
- Campaigns, Projects, Media, Blog pages

## Tech Stack
- React, React Router v6, Axios, Bootstrap
- Deployment: GitHub Pages

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/my-ngo-website.git
   cd my-ngo-website
2.  Install dependencies:
     npm install
3. Create .env file:
   REACT_APP_API_BASE=https://ngo-cms-backend-5oez.onrender.com/api
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
4. Run locally:
   npm start
5. Build for production:
   npm run build
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ parse correctly

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role"); // ✅ clear role
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language} // ✅ bind to current language
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
update this
Perfect Komal 🌸 — let’s update your NavBar.jsx so it matches your new requirements:

✅ Changes Made
Fix Home link → It should point to /home (your public HomePage), not / (which is login).

Remove User Dashboard tab → No longer shown in the navbar.

Keep Admin Dashboard conditional → Only visible if isAdmin === true.

Clean conditional rendering → Show Register/Login when logged out, Logout when logged in.

✨ Updated NavBar.jsx
jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")} // ✅ go to public Home
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/home", label: "Home" }, // ✅ fixed
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* ✅ Show Register/Login when logged out */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* ✅ Show Logout when logged in */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* ✅ Language Selector */}
            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
🌟 What This Fixes
Home now points to /home (public page).

User Dashboard is gone.

Admin Dashboard only shows for admins.

Login/Register only show when logged out.

Logout only shows when logged in.

✨ Komal, this will make your navbar clean and role-aware. Do you also want me to help you make the ProtectedRoute smarter so it automatically redirects non-admins away from /admin-dashboard?

even after rfresging its the same issue
Komal 🌸 — thanks for clarifying. If after refreshing you still see the User Dashboard tab and the Home link keeps sending you back to login, that means the issue isn’t just in your NavBar.jsx but in how your routes are wired.

🔍 Why It’s Happening
Home route mismatch

In your App.jsx, / is mapped to LoginPage.

Your navbar “Home” link points to /home.

But when you click the brand logo, it still navigates to / (login).

User Dashboard tab still showing

Even if you removed the /user-dashboard route, the tab may still be hardcoded in your NavBar.jsx or cached in localStorage.

If role or isAdmin logic is misapplied, it may still render dashboard links.

✅ Fixes
1. Make / the real Home
If you want Home to be the default public page, change your routes:

jsx
<Route path="/" element={<Layout><HomePage /></Layout>} />   // ✅ Home is root
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
This way:

/ → HomePage

/login → LoginPage

/register → RegisterPage

2. Remove User Dashboard Route
Delete this block entirely from App.jsx:

jsx
<Route
  path="/user-dashboard"
  element={
    <ProtectedRoute>
      <Layout><DashboardPage /></Layout>
    </ProtectedRoute>
  }
/>
And also remove any NavLink pointing to /user-dashboard in NavBar.jsx.

3. Fix Navbar Brand Logo
In NavBar.jsx, update:

jsx
onClick={() => navigate("/home")}
to:

jsx
onClick={() => navigate("/")}
since / is now your Home route.

🌟 Summary
Change / to HomePage in routes.

Remove /user-dashboard route completely.

Update navbar logo to point to /.

✨ Komal, once you do this, refreshing won’t bring back the dashboard tab, and Home will always load your public homepage instead of login. Do you want me to rewrite your App.jsx fully with these corrected routes so you can copy-paste directly?

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

// Authentication Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
        {/* ✅ Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />   // ✅ Home is root
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><Layout><AboutUs /></Layout></ProtectedRoute>} />
        <Route path="/work" element={<ProtectedRoute><Layout><OurWork /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/media" element={<ProtectedRoute><Layout><Media /></Layout></ProtectedRoute>} />
        <Route path="/get-involved" element={<ProtectedRoute><Layout><GetInvolved /></Layout></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Layout><BlogPage /></Layout></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Layout><BlogDetail /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Layout><ContactUs /></Layout></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><Layout><DonatePage /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Dashboard Only */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Forms */}
        <Route path="/volunteer" element={<ProtectedRoute><Layout><VolunteerPage /></Layout></ProtectedRoute>} />
        <Route path="/volunteer/form" element={<ProtectedRoute><Layout><VolunteerForm /></Layout></ProtectedRoute>} />
        <Route path="/partner" element={<ProtectedRoute><Layout><PartnerForm /></Layout></ProtectedRoute>} />
        <Route path="/fundraise" element={<ProtectedRoute><Layout><FundraiseForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Layout><CampaignsPage /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/create" element={<ProtectedRoute><Layout><CampaignCreateForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/list" element={<ProtectedRoute><Layout><CampaignList /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id" element={<ProtectedRoute><Layout><CampaignDetail /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id/join" element={<ProtectedRoute><Layout><CampaignJoinForm /></Layout></ProtectedRoute>} />
        <Route path="/campaign-participants" element={<ProtectedRoute><Layout><CampaignParticipationList /></Layout></ProtectedRoute>} />
        <Route path="/subscribe" element={<ProtectedRoute><Layout><CommunitySubscribe /></Layout></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscriptionList /></Layout></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Layout><DonationsList /></Layout></ProtectedRoute>} />
        <Route path="/media/upload" element={<ProtectedRoute><Layout><MediaUploadForm /></Layout></ProtectedRoute>} />
        <Route path="/media/list" element={<ProtectedRoute><Layout><MediaList /></Layout></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
update this
Great Komal 🌸 — let’s update your App.jsx so it matches your intent:

✅ Changes
Home is the default public route (/) → no more redirecting to login when you click Home.

Removed User Dashboard completely → only Admin Dashboard remains.

Clean fallback → unknown routes redirect to Home instead of Login (so refreshing doesn’t throw you back to login).

✨ Updated App.jsx
jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // wrapper

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

// Authentication Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
        {/* ✅ Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />   {/* Home is root */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><Layout><AboutUs /></Layout></ProtectedRoute>} />
        <Route path="/work" element={<ProtectedRoute><Layout><OurWork /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/media" element={<ProtectedRoute><Layout><Media /></Layout></ProtectedRoute>} />
        <Route path="/get-involved" element={<ProtectedRoute><Layout><GetInvolved /></Layout></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Layout><BlogPage /></Layout></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Layout><BlogDetail /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Layout><ContactUs /></Layout></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><Layout><DonatePage /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Dashboard Only */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Forms */}
        <Route path="/volunteer" element={<ProtectedRoute><Layout><VolunteerPage /></Layout></ProtectedRoute>} />
        <Route path="/volunteer/form" element={<ProtectedRoute><Layout><VolunteerForm /></Layout></ProtectedRoute>} />
        <Route path="/partner" element={<ProtectedRoute><Layout><PartnerForm /></Layout></ProtectedRoute>} />
        <Route path="/fundraise" element={<ProtectedRoute><Layout><FundraiseForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Layout><CampaignsPage /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/create" element={<ProtectedRoute><Layout><CampaignCreateForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/list" element={<ProtectedRoute><Layout><CampaignList /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id" element={<ProtectedRoute><Layout><CampaignDetail /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id/join" element={<ProtectedRoute><Layout><CampaignJoinForm /></Layout></ProtectedRoute>} />
        <Route path="/campaign-participants" element={<ProtectedRoute><Layout><CampaignParticipationList /></Layout></ProtectedRoute>} />
        <Route path="/subscribe" element={<ProtectedRoute><Layout><CommunitySubscribe /></Layout></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscriptionList /></Layout></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Layout><DonationsList /></Layout></ProtectedRoute>} />
        <Route path="/media/upload" element={<ProtectedRoute><Layout><MediaUploadForm /></Layout></ProtectedRoute>} />
        <Route path="/media/list" element={<ProtectedRoute><Layout><MediaList /></Layout></ProtectedRoute>} />

        {/* ✅ Fallback → go to Home instead of Login */}
        <Route path="*" element={<Layout><HomePage /></Layout>} />
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
🌟 What This Fixes
Home (/) is now public → refreshing or clicking Home won’t send you back to login.

User Dashboard removed → only Admin Dashboard remains.

Fallback routes → unknown paths redirect to Home, not Login.

✨ Komal, this should finally solve the refresh/login issue and remove the unwanted dashboard. Would you like me to also update your ProtectedRoute.jsx so it automatically blocks non-admins from accessing /admin-dashboard?

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")} 
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/*  Show Register/Login when logged out */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Logout when logged in */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/*  Language Selector */}
            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
update this
Perfect Komal 🌸 — let’s clean up your NavBar.jsx so it aligns with the updated routing and avoids the confusion you’ve been seeing:

✅ Changes
Brand logo → should navigate to / (your Home route), not /home.

Home link → updated to / instead of mixing /home and /.

Removed duplication → consistent routing so refreshing won’t bounce you back to login.

Kept Admin Dashboard conditional → only shows if isAdmin === true.

✨ Updated NavBar.jsx
jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}   // ✅ go to Home (root)
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },   // ✅ root is Home
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Show Register/Login when logged out */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Logout when logged in */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Language Selector */}
            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
🌟 What This Fixes
Brand logo now correctly goes to / (Home).

Home link is consistent (/ instead of /home).

No User Dashboard tab.

Admin Dashboard only shows for admins.

✨ Komal, this will stop the refresh issue and keep your navigation clean. Would you like me to also adjust your ProtectedRoute.jsx so non-admins can’t access /admin-dashboard even if they type the URL manually?

give the bash
Got it Komal 🌸 — you want a Git Bash workflow you can copy‑paste and run for your project. Here’s a clean, step‑by‑step script you can use whenever you make changes and need to push them to GitHub (which then triggers Render/Netlify deployment):

✅ Git Bash Workflow
bash
# 1. Navigate to your project folder
cd path/to/your/project

# 2. Check current branch
git branch

# 3. Pull latest changes (avoid conflicts)
git pull origin main

# 4. Stage all changes
git add .

# 5. Commit with a clear message
git commit -m "Fix register API logging and navbar routing"

# 6. Push to GitHub
git push origin main
🔍 Extra Useful Commands
Check status before committing

bash
git status
See recent commits

bash
git log --oneline --graph --decorate --all
Undo last commit (if needed)

bash
git reset --soft HEAD~1
Switch branches

bash
git checkout branch-name
🌟 Deployment Flow for You
Frontend (React) → GitHub → Netlify auto‑deploy.

Backend (Django) → GitHub → Render auto‑deploy.

So every time you run the above Git Bash workflow, both frontend and backend redeploy automatically.

✨ Komal, would you like me to also create a bash script file (like deploy.sh) so you can just run ./deploy.sh instead of typing these commands each time?

now there is no login and register page before entrying to website
Komal 🌸 — I see exactly what happened. Right now your App.jsx is set up with:

jsx
<Route path="/" element={<Layout><HomePage /></Layout>} />   // Home is root
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
That means when someone visits /, they go straight to HomePage — skipping login/register entirely.

✅ Two Options
1. If you want login/register before entry
Make / point to LoginPage, not Home:

jsx
<Route path="/" element={<LoginPage />} />   // Default entry point
<Route path="/home" element={<Layout><HomePage /></Layout>} />  // Home after login
<Route path="/register" element={<RegisterPage />} />
Then in your NavBar.jsx, update the brand logo and Home link to point to /home:

jsx
onClick={() => navigate("/home")}
and

jsx
{ to: "/home", label: "Home" }
2. If you want Home to be public (no login required)
Keep / as Home, but remove ProtectedRoute from pages you want public.
Right now, even About, Work, Blog, etc. are wrapped in ProtectedRoute. That forces login.
If you want them public, change:

jsx
<Route path="/about" element={<Layout><AboutUs /></Layout>} />
instead of:

jsx
<Route path="/about" element={<ProtectedRoute><Layout><AboutUs /></Layout></ProtectedRoute>} />
🌟 Recommendation
Since you said “now there is no login and register page before entering”, you probably want Option 1:

/ → LoginPage

/home → HomePage (after login)

/register → RegisterPage

That way, users must log in or register before they can see the site.

✨ Komal, do you want me to rewrite your App.jsx fully in Option 1 style (login first, then home) so you can copy‑paste directly?

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // wrapper

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

// Authentication Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
        {/* ✅ Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />   {/* Home is root */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><Layout><AboutUs /></Layout></ProtectedRoute>} />
        <Route path="/work" element={<ProtectedRoute><Layout><OurWork /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/media" element={<ProtectedRoute><Layout><Media /></Layout></ProtectedRoute>} />
        <Route path="/get-involved" element={<ProtectedRoute><Layout><GetInvolved /></Layout></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Layout><BlogPage /></Layout></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Layout><BlogDetail /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Layout><ContactUs /></Layout></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><Layout><DonatePage /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Dashboard Only */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Forms */}
        <Route path="/volunteer" element={<ProtectedRoute><Layout><VolunteerPage /></Layout></ProtectedRoute>} />
        <Route path="/volunteer/form" element={<ProtectedRoute><Layout><VolunteerForm /></Layout></ProtectedRoute>} />
        <Route path="/partner" element={<ProtectedRoute><Layout><PartnerForm /></Layout></ProtectedRoute>} />
        <Route path="/fundraise" element={<ProtectedRoute><Layout><FundraiseForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Layout><CampaignsPage /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/create" element={<ProtectedRoute><Layout><CampaignCreateForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/list" element={<ProtectedRoute><Layout><CampaignList /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id" element={<ProtectedRoute><Layout><CampaignDetail /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id/join" element={<ProtectedRoute><Layout><CampaignJoinForm /></Layout></ProtectedRoute>} />
        <Route path="/campaign-participants" element={<ProtectedRoute><Layout><CampaignParticipationList /></Layout></ProtectedRoute>} />
        <Route path="/subscribe" element={<ProtectedRoute><Layout><CommunitySubscribe /></Layout></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscriptionList /></Layout></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Layout><DonationsList /></Layout></ProtectedRoute>} />
        <Route path="/media/upload" element={<ProtectedRoute><Layout><MediaUploadForm /></Layout></ProtectedRoute>} />
        <Route path="/media/list" element={<ProtectedRoute><Layout><MediaList /></Layout></ProtectedRoute>} />

        {/* ✅ Fallback → go to Home instead of Login */}
        <Route path="*" element={<Layout><HomePage /></Layout>} />
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
update this
Komal 🌸 — right now your App.jsx makes / the HomePage, which is why login/register are skipped. If you want users to see login/register before entering the site, you need to make / point to LoginPage instead, and move HomePage to /home.

Here’s the corrected version:

✨ Updated App.jsx (Login first, then Home)
jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // wrapper

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

// Authentication Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
        {/* ✅ Authentication first */}
        <Route path="/" element={<LoginPage />} />   {/* Default entry point */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Public Home after login */}
        <Route path="/home" element={<Layout><HomePage /></Layout>} />

        {/* ✅ Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><Layout><AboutUs /></Layout></ProtectedRoute>} />
        <Route path="/work" element={<ProtectedRoute><Layout><OurWork /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/media" element={<ProtectedRoute><Layout><Media /></Layout></ProtectedRoute>} />
        <Route path="/get-involved" element={<ProtectedRoute><Layout><GetInvolved /></Layout></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Layout><BlogPage /></Layout></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Layout><BlogDetail /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Layout><ContactUs /></Layout></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><Layout><DonatePage /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Dashboard Only */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />

        {/* ✅ Admin Forms */}
        <Route path="/volunteer" element={<ProtectedRoute><Layout><VolunteerPage /></Layout></ProtectedRoute>} />
        <Route path="/volunteer/form" element={<ProtectedRoute><Layout><VolunteerForm /></Layout></ProtectedRoute>} />
        <Route path="/partner" element={<ProtectedRoute><Layout><PartnerForm /></Layout></ProtectedRoute>} />
        <Route path="/fundraise" element={<ProtectedRoute><Layout><FundraiseForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Layout><CampaignsPage /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/create" element={<ProtectedRoute><Layout><CampaignCreateForm /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/list" element={<ProtectedRoute><Layout><CampaignList /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id" element={<ProtectedRoute><Layout><CampaignDetail /></Layout></ProtectedRoute>} />
        <Route path="/campaigns/:id/join" element={<ProtectedRoute><Layout><CampaignJoinForm /></Layout></ProtectedRoute>} />
        <Route path="/campaign-participants" element={<ProtectedRoute><Layout><CampaignParticipationList /></Layout></ProtectedRoute>} />
        <Route path="/subscribe" element={<ProtectedRoute><Layout><CommunitySubscribe /></Layout></ProtectedRoute>} />
        <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscriptionList /></Layout></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Layout><DonationsList /></Layout></ProtectedRoute>} />
        <Route path="/media/upload" element={<ProtectedRoute><Layout><MediaUploadForm /></Layout></ProtectedRoute>} />
        <Route path="/media/list" element={<ProtectedRoute><Layout><MediaList /></Layout></ProtectedRoute>} />

        {/* ✅ Fallback → go to Login */}
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
🌟 What This Fixes
Visiting / → shows LoginPage.

After login, users go to /home.

Register is available at /register.

Home is no longer public until login.

✨ Komal, this will restore the login/register flow before entering the site. Would you like me to also adjust your ProtectedRoute.jsx so it automatically redirects unauthenticated users to /login if they try to access /home or any protected page?

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}   
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },   
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Show Register/Login when logged out */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Logout when logged in */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Language Selector */}
            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
Komal 🌸 — thanks for sharing your current NavBar.jsx. Right now the brand logo and the “Home” link both point to /, but in your updated routing setup / is LoginPage and /home is HomePage. That’s why you’re not seeing login/register before entry — the navbar is sending you back to the wrong route.

✅ What Needs Fixing
Brand logo → should navigate to /home (your public HomePage after login).

Home link → should also point to /home.

Consistency → keep /login and /register for authentication, and /home for the actual site entry.

✨ Updated NavBar.jsx
jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}   {/* ✅ go to HomePage */}
        >
          Helping Hands Foundation
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/home", label: "Home" },   {/* ✅ fixed */}
              { to: "/about", label: "About Us" },
              { to: "/work", label: "Our Work" },
              { to: "/projects", label: "Projects" },
              { to: "/media", label: "Media" },
              { to: "/get-involved", label: "Get Involve" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact Us" },
              { to: "/donate", label: "Donate" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive
                      ? " fw-semibold text-primary border-bottom border-primary"
                      : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Show Register/Login when logged out */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Logout when logged in */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Language Selector */}
            <li className="nav-item ms-3">
              <select
                className="form-select form-select-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
🌟 What This Fixes
Brand logo → goes to /home.

Home link → consistent with /home.

Login/Register → still available at /login and /register.

Users must log in first, then can access /home.

✨ Komal, this will restore the login/register flow before entry and keep navigation consistent. Would you like me to also adjust your ProtectedRoute.jsx so that if someone tries to go to /home without logging in, they’re automatically redirected to /login?

import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const data = res.data;

      if (data.message === "Login successful") {
        localStorage.setItem("token", "dummy-session-token");
        localStorage.setItem("isAdmin", data.isAdmin || false);
        localStorage.setItem("role", data.role || "user");

        if (data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-primary">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-3 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-4">
        <p>New user? Register below:</p>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate("/register")}
        >
          Register as New User
        </button>
      </div>

      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default LoginPage;
update this
Komal 🌸 — right now your LoginPage.jsx still tries to send non‑admin users to /user-dashboard, but you’ve already removed that route. Let’s update it so the flow is consistent:

✅ Changes
Redirect non‑admins to /home instead of /user-dashboard.

Store the real token from backend response instead of a dummy string.

Simplify localStorage values (always strings).

Cleaner error handling.

✨ Updated LoginPage.jsx
jsx
import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const data = res.data;

      if (data.message === "Login successful") {
        // ✅ store token from backend (or fallback dummy)
        localStorage.setItem("token", data.token || "dummy-session-token");
        localStorage.setItem("isAdmin", String(data.isAdmin || false));
        localStorage.setItem("role", data.role || "user");

        // ✅ redirect based on role
        if (data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");   // ✅ go to Home instead of user-dashboard
        }
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-primary">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-3 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-4">
        <p>New user? Register below:</p>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate("/register")}
        >
          Register as New User
        </button>
      </div>

      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default LoginPage;
🌟 What This Fixes
Non‑admins now go to /home (your public site entry).

Admins still go to /admin-dashboard.

No more broken /user-dashboard route.

Token and role stored consistently in localStorage.

✨ Komal, this will align your login flow with the updated routing. Do you also want me to show you how to update your ProtectedRoute.jsx so that if someone tries to access /home or any protected page without logging in, they’re automatically redirected to /login?

ProcessError: fatal: unable to access 'https://github.com/HiKomal11/my-ngo-website.git/': Could not resolve host: github.com

    at ChildProcess.<anonymous> (C:\Users\Komal Pandey\my-ngo-website\node_modules\gh-pages\lib\git.js:42:16)
    at ChildProcess.emit (node:events:508:28)
    at maybeClose (node:internal/child_process:1101:16)
    at ChildProcess._handle.onexit (node:internal/child_process:305:5)
Komal 🌸 — that error is coming from Git itself, not your code.

The key part is:

Code
fatal: unable to access 'https://github.com/HiKomal11/my-ngo-website.git/': 
Could not resolve host: github.com
✅ What It Means
Your machine couldn’t reach github.com at all.

This is a network/DNS issue, not a problem with your repo or gh‑pages script.

🔧 How to Fix
1. Check Internet & DNS
Run in Git Bash:

bash
ping github.com
If it fails → your DNS or firewall is blocking GitHub.

Fix:

Restart Wi‑Fi or switch network.

Try setting Google DNS:

Go to Network Settings → DNS

Set to 8.8.8.8 and 8.8.4.4.

2. Verify GitHub URL
Make sure your remote is correct:

bash
git remote -v
It should show:

Code
origin  https://github.com/HiKomal11/my-ngo-website.git (fetch)
origin  https://github.com/HiKomal11/my-ngo-website.git (push)
If not, reset it:

bash
git remote set-url origin https://github.com/HiKomal11/my-ngo-website.git
3. Try HTTPS vs SSH
If HTTPS keeps failing, switch to SSH:

bash
git remote set-url origin git@github.com:HiKomal11/my-ngo-website.git
Then test:

bash
ssh -T git@github.com
4. Re‑run Deployment
Once connectivity is fixed, re‑run:

bash
npm run deploy
or if you’re using gh‑pages directly:

bash
npx gh-pages -d build
🌟 Quick Checklist
✅ Internet works?

✅ DNS resolves github.com??

✅ Remote URL is correct?

✅ Firewall/VPN not blocking?

✨ Komal, once you fix the DNS/remote issue, your deploy will work. Do you want me to give you a ready‑to‑paste Git Bash script that checks connectivity, fixes DNS, and redeploys in one go?

ProcessError: fatal: unable to access 'https://github.com/HiKomal11/my-ngo-website.git/': Could not resolve host: github.com

    at ChildProcess.<anonymous> (C:\Users\Komal Pandey\my-ngo-website\node_modules\gh-pages\lib\git.js:42:16)
    at ChildProcess.emit (node:events:508:28)
    at maybeClose (node:internal/child_process:1101:16)
    at ChildProcess._handle.onexit (node:internal/child_process:305:5)
Komal 🌸 — that error means your system couldn’t reach GitHub.com at all, so the gh-pages deployment script failed. It’s not a problem with your repo itself, but with network/DNS resolution. Let’s break it down:

🔍 Why You See This
fatal: unable to access 'https://github.com/...': Could not resolve host: github.com  
→ Git can’t resolve the domain name github.com.

Common causes:

No internet connection (or unstable).

DNS issue (your system can’t translate github.com to an IP).

Firewall/VPN blocking GitHub.

Proxy misconfiguration.

✅ Step‑by‑Step Fix
1. Check Internet
Run in Git Bash:

bash
ping github.com
If it fails, your internet/DNS is the issue.

2. Clear DNS Cache
On Windows (open Command Prompt as admin):

bash
ipconfig /flushdns
3. Try Again
bash
git remote -v   # confirm remote URL
git push origin main
4. Check Proxy/Firewall
If you’re behind a proxy, configure Git:

bash
git config --global http.proxy http://proxyaddress:port
git config --global https.proxy http://proxyaddress:port
Or unset if not needed:

bash
git config --global --unset http.proxy
git config --global --unset https.proxy
5. Verify Remote URL
Make sure your repo remote is correct:

bash
git remote set-url origin https://github.com/HiKomal11/my-ngo-website.git
🌟 Quick Test
Try cloning any repo:

bash
git clone https://github.com/octocat/Hello-World.git
If that fails with the same error, it’s definitely a DNS/network issue, not your repo.

✨ Komal, once you fix the DNS/network resolution, your gh-pages deployment will work fine. Do you want me to give you a ready Git Bash script that flushes DNS, resets proxy, and retries push in one go? That way you don’t have to type each command manually.

now even a single button from submitting any form to pay with ... is working
Komal 🌸 — if none of your buttons are working anymore (form submit, payment, etc.), that usually means something broke in your frontend routing or event handling. Let’s troubleshoot step by step:

🔍 Common Causes
React Router setup

If you made / → LoginPage and /home → HomePage, but your NavBar still points to /, clicking “Home” may reload the login instead of the actual page.

This can break navigation and prevent buttons from firing correctly.

Form submit blocked

If your forms rely on onSubmit but the route reloads or redirects, the handler never runs.

Check that your <form> has onSubmit={handleSubmit} and no accidental action attribute.

Payment buttons

If you integrated Razorpay/Stripe/PayPal, those buttons need the correct API keys and backend endpoints.

If your backend is returning 500 or failing CORS, the button will appear but won’t trigger payment.

JavaScript errors

One uncaught error in React can stop all event handlers.

Open browser console (F12 → Console) and check for red error messages.

✅ Quick Fix Checklist
Check console logs: Do you see errors like TypeError: handleSubmit is not a function or Failed to fetch?

Verify routes: Make sure NavBar points to /home for Home, not /.

Check ProtectedRoute: If it’s redirecting incorrectly, it may block all forms.

Test backend API: Try hitting /api/register/ or /api/donate/ directly in Postman to confirm they respond.

Payment SDKs: Ensure Razorpay/Stripe/PayPal scripts are loaded in index.html or via npm.

🌟 Next Step
Since this is a global issue (all buttons), the fastest way to debug is:

Open browser console → try clicking a button.

Copy the error message you see.

Paste it here — I’ll give you the exact fix.

✨ Komal, I suspect your routing changes (making / → Login and /home → Home) broke navigation, which is why buttons don’t trigger properly. Would you like me to rewrite your ProtectedRoute.jsx so it cleanly redirects unauthenticated users to /login but still allows forms and payments to work?

what i am saying is buttons not working in the website and i dont think it has anything to do with directing or redirecting login page
Got it Komal 🌸 — thanks for clarifying. If no buttons are working anywhere on your site (form submits, payment triggers, etc.), that points to a JavaScript/runtime issue rather than routing. Let’s break down the likely causes:

🔍 Why Buttons Might Stop Working
Global JavaScript Error

If one uncaught error happens (e.g. in your React components or a missing import), React can stop rendering updates and event handlers won’t fire.

Check your browser console (F12 → Console). If you see red errors, that’s the root cause.

PreventDefault Missing or Misused

If your forms/buttons rely on onSubmit or onClick, but something is preventing default incorrectly, the handler won’t run.

Example: <form action="#"> without onSubmit={handleSubmit} can block React’s handler.

Payment SDKs Not Loaded

Razorpay/Stripe/PayPal buttons require their scripts to be loaded. If the script failed (e.g. network issue, blocked by adblocker, or wrong API key), the button will appear but won’t respond.

Build/Deployment Issue

If you deployed to GitHub Pages/Netlify and the build has errors, the site may load static HTML but none of the React event handlers are attached.

This happens if npm run build produced errors or if the JS bundle isn’t loading.

✅ How to Debug Quickly
Open Console → Click a button → see if any error appears.

Example: Uncaught TypeError: handleSubmit is not a function

Or Failed to fetch /api/....

Check Network Tab → See if API calls are being made when you click.

If nothing shows, the handler isn’t firing.

If it shows but fails, it’s a backend issue.

Verify Scripts → Make sure your index.html includes Razorpay/Stripe/PayPal script tags if you’re using them.

Example for Razorpay:

html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
Check Build Output → Run locally:

bash
npm start
If buttons work locally but not on GitHub Pages/Netlify, then deployment is missing JS bundle.

🌟 Next Step
Since this is a site-wide issue, the fastest way forward is:

Open your browser console → click any button.

Copy the error message you see.

Paste it here — I’ll give you the exact fix.

✨ Komal, I suspect your frontend build isn’t attaching event handlers (likely due to a JS error or missing script). Once you share the console error, I can pinpoint whether it’s React, API, or payment SDK. Would you like me to walk you through checking the console step by step so you can grab the error quickly?

The user attached 1 tabs as the context for the current turn. Please use these tabs first to respond to this message: racking Prevention blocked access to storage for <URL>.
js:1   Failed to load resource: the server responded with a status of 400 ()
ngo-cms-backend-5oez.onrender.com/api/api/campaigns/:1   Failed to load resource: the server responded with a status of 404 ()
Home.jsx:48  Error fetching campaigns: Yn
(anonymous) @ Home.jsx:48
ngo-cms-backend-5oez.onrender.com/api/api/about/:1   Failed to load resource: the server responded with a status of 404 ()
ngo-cms-backend-5oez.onrender.com/api/api/team/:1   Failed to load resource: the server responded with a status of 404 ()
ngo-cms-backend-5oez.onrender.com/api/api/work/:1   Failed to load resource: the server responded with a status of 404 ()
OurWork.jsx:56  Error fetching work areas: Yn
(anonymous) @ OurWork.jsx:56
400x200?text=Image+Unavailable:1   Failed to load resource: net::ERR_NAME_NOT_RESOLVED
ngo-cms-backend-5oez.onrender.com/api/api/projects/:1   Failed to load resource: the server responded with a status of 404 ()
Projects.jsx:51  Error fetching projects: Yn
(anonymous) @ Projects.jsx:51
ngo-cms-backend-5oez.onrender.com/api/api/media/:1   Failed to load resource: the server responded with a status of 404 ()
Media.jsx:87  Error fetching media: Yn
(anonymous) @ Media.jsx:87
400x200?text=Image+Unavailable:1   Failed to load resource: net::ERR_NAME_NOT_RESOLVED
via.placeholder.com/400x300?text=Image+Unavailable:1   Failed to load resource: net::ERR_NAME_NOT_RESOLVED
via.placeholder.com/400x300?text=Image+Unavailable:1   Failed to load resource: net::ERR_NAME_NOT_RESOLVED
ngo-cms-backend-5oez.onrender.com/api/api/volunteers/:1   Failed to load resource: the server responded with a status of 404 ()
VolunteerForm.jsx:40  Error submitting volunteer: 
<!doctype html>
<html lang="en">
<head>
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1><p>The requested resource was not found on this server.</p>
</body>
</html>

onSubmit @ VolunteerForm.jsx:40
ngo-cms-backend-5oez.onrender.com/api/api/volunteers/:1   Failed to load resource: the server responded with a status of 404 ()
VolunteerForm.jsx:40  Error submitting volunteer: 
<!doctype html>
<html lang="en">
<head>
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1><p>The requested resource was not found on this server.</p>
</body>
</html>

onSubmit @ VolunteerForm.jsx:40
ngo-cms-backend-5oez.onrender.com/api/api/volunteers/:1   Failed to load resource: the server responded with a status of 404 ()
VolunteerForm.jsx:40  Error submitting volunteer: 
<!doctype html>
<html lang="en">
<head>
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1><p>The requested resource was not found on this server.</p>
</body>
</html>

onSubmit @ VolunteerForm.jsx:40
ngo-cms-backend-5oez.onrender.com/api/api/partner-inquiries/:1   Failed to load resource: the server responded with a status of 404 ()
PartnerForm.jsx:38  Error submitting request: 
<!doctype html>
<html lang="en">
<head>
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1><p>The requested resource was not found on this server.</p>
</body>
</html>

onSubmit @ PartnerForm.jsx:38
ngo-cms-backend-5oez.onrender.com/api/api/blog/:1   Failed to load resource: the server responded with a status of 404 ()
BlogPage.jsx:20  Error fetching blogs: Yn
(anonymous) @ BlogPage.jsx:20
ngo-cms-backend-5oez.onrender.com/api/api/payments/stripe/create-order/:1   Failed to load resource: the server responded with a status of 404 ()
DonatePage.jsx:84  Stripe error: Yn
onClick @ DonatePage.jsx:84
ngo-cms-backend-5oez.onrender.com/api/api/payments/razorpay/create-order/:1   Failed to load resource: the server responded with a status of 404 ()
DonatePage.jsx:56  Razorpay error: Yn
onClick
Komal 🌸 — thanks for sharing the console logs. They explain exactly why none of your buttons or forms are working:

🔍 What the Errors Mean
Every request is going to URLs like:

Code
ngo-cms-backend-5oez.onrender.com/api/api/campaigns/
ngo-cms-backend-5oez.onrender.com/api/api/volunteers/
ngo-cms-backend-5oez.onrender.com/api/api/payments/stripe/create-order/
The backend responds with 404 Not Found.

That means your frontend is calling the wrong endpoints — specifically, it’s adding an extra api/ in the path.

Example:

Correct: https://ngo-cms-backend-5oez.onrender.com/api/campaigns/

Wrong (what you have): https://ngo-cms-backend-5oez.onrender.com/api/api/campaigns/

✅ Why Buttons Don’t Work
Forms (volunteer, partner, donate, etc.) all submit to these broken URLs.

Since the backend returns 404, the frontend shows “Error submitting…” and nothing happens.

Payment buttons (Stripe, Razorpay) also fail because they’re hitting /api/api/payments/....

🔧 How to Fix
Check your API base URL in frontend

Likely in services/api.js or wherever you set axios.create.

Right now it’s probably:

js
const API_BASE = "https://ngo-cms-backend-5oez.onrender.com/api/";
But then your calls add another api/:

js
axios.post(API_BASE + "api/volunteers/", data)
Result → .../api/api/volunteers/

Fix the paths

Remove the duplicate api/.

Example:

js
axios.post(API_BASE + "volunteers/", data)
Or set:

js
const API_BASE = "https://ngo-cms-backend-5oez.onrender.com/";
and then call:

js
axios.post(API_BASE + "api/volunteers/", data)
Check all endpoints

Campaigns → /api/campaigns/

About → /api/about/

Team → /api/team/

Work → /api/work/

Projects → /api/projects/

Media → /api/media/

Volunteers → /api/volunteers/

Partner inquiries → /api/partner-inquiries/

Blog → /api/blog/

Payments → /api/payments/stripe/create-order/ and /api/payments/razorpay/create-order/

🌟 Next Step
Open your services/api.js (or wherever you define API calls).

Fix the base URL so it doesn’t double api/.

Redeploy frontend → buttons will start working again.

✨ Komal, this is a simple but critical bug: your frontend is calling /api/api/... instead of /api/.... Once you fix that in your API service file, all forms and payment buttons will work again.

Do you want me to show you the corrected services/api.js structure so you can copy‑paste it directly?

But then your calls add another api/:

js
axios.post(API_BASE + "api/volunteers/", data)
Result → .../api/api/volunteers/

where is this
Komal 🌸 — excellent question. That duplicate api/api/... isn’t coming from React Router, it’s coming from how your API base URL is defined in your frontend service file.

🔍 Where to Look
You’ll find this in your frontend code, usually in:

src/services/api.js

or sometimes src/api/index.js / src/utils/api.js

That’s where you set up your axios instance or helper functions.

✅ What’s Happening
Right now you likely have something like:

js
// services/api.js
import axios from "axios";

const API_BASE = "https://ngo-cms-backend-5oez.onrender.com/api/";

export const loginUser = (data) =>
  axios.post(API_BASE + "api/login/", data);   // ❌ adds extra "api/"
So when you call loginUser, it becomes:

Code
https://ngo-cms-backend-5oez.onrender.com/api/api/login/
That’s why you’re seeing 404 errors.

🔧 How to Fix
Change your API calls to remove the duplicate api/:

js
// services/api.js
import axios from "axios";

const API_BASE = "https://ngo-cms-backend-5oez.onrender.com/api/";

// ✅ Correct usage
export const loginUser = (data) =>
  axios.post(API_BASE + "login/", data);

export const registerUser = (data) =>
  axios.post(API_BASE + "register/", data);

export const submitVolunteer = (data) =>
  axios.post(API_BASE + "volunteers/", data);

export const submitPartner = (data) =>
  axios.post(API_BASE + "partner-inquiries/", data);

export const fetchCampaigns = () =>
  axios.get(API_BASE + "campaigns/");
🌟 Next Step
Open src/services/api.js.

Search for "api/" inside the function calls.

Remove the extra api/ after API_BASE.

Redeploy frontend → all buttons (forms, payments) will start working again.

✨ Komal, once you fix this in services/api.js, your buttons will stop failing with 404. Do you want me to rewrite the entire services/api.js file with corrected endpoints so you can copy‑paste directly?

import axios from "axios";

// Centralized API instance
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/",
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
this is my api.jsx
Perfect Komal 🌸 — thanks for sharing your api.jsx. This explains why you were seeing .../api/api/... in your logs.

🔍 What’s Happening
In your backend, all endpoints are prefixed with /api/ (e.g. /api/volunteers/, /api/campaigns/).

But in your frontend api.jsx, you set:

js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/",
  headers: { "Content-Type": "application/json" },
});
Then you call:

js
api.post("/volunteers/", data);
That produces:

Code
https://ngo-cms-backend-5oez.onrender.com/volunteers/
👉 Missing the /api/ prefix, so the backend returns 404 Not Found.

Earlier, when you tried to fix it, you probably added api/ both in the baseURL and in the calls, which caused api/api/....

✅ Correct Fix
You only need one /api/ — either in the baseURL or in the paths, not both.

Option A (recommended): Put /api/ in baseURL
js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api/",
  headers: { "Content-Type": "application/json" },
});
Then keep all calls as they are:

js
export const volunteerSignup = (data) => api.post("/volunteers/", data);
export const getBlogs = () => api.get("/blog/");
export const createFundraiseCampaign = (data) => api.post("/campaigns/", data);
export const uploadMedia = (data) => api.post("/media/", data);
Result → https://ngo-cms-backend-5oez.onrender.com/api/volunteers/ ✅

Option B: Keep baseURL without /api/
js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/",
  headers: { "Content-Type": "application/json" },
});
Then update all calls to include /api/:

js
export const volunteerSignup = (data) => api.post("/api/volunteers/", data);
export const getBlogs = () => api.get("/api/blog/");
export const createFundraiseCampaign = (data) => api.post("/api/campaigns/", data);
export const uploadMedia = (data) => api.post("/api/media/", data);
🌟 Recommendation
Go with Option A (baseURL includes /api/) — it’s cleaner and avoids repeating /api/ in every call.

✨ Komal, once you fix this in api.jsx, all your buttons (forms, payments, etc.) will stop failing with 404. Do you want me to rewrite your entire api.jsx file in the corrected Option A style so you can copy‑paste directly?

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
export const submitContactForm = (data) => api.post("/contact/", data);

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
Komal 🌸 — this version of your api.jsx looks much cleaner now. The key fix you’ve made is setting the baseURL to include /api once:

js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});
That means every call like:

js
api.post("/volunteers/", data);
will correctly resolve to:

Code
https://ngo-cms-backend-5oez.onrender.com/api/volunteers/
✅ No more api/api/... duplication.
✅ All your buttons (forms, donations, payments) should now hit the right backend endpoints.

🔍 Double‑check endpoints
Make sure your backend actually exposes these routes:

/api/register/

/api/login/

/api/logout/

/api/auth/status/

/api/blog/

/api/blog/:id/

/api/donations/

/api/contact/

/api/volunteers/

/api/partner-inquiries/

/api/campaigns/

/api/subscribe/

/api/subscribe/:id/

/api/campaign-participation/

/api/media/

If any of these don’t exist in Django, you’ll still see 404s — but now it will be because the backend route isn’t implemented, not because of a double api/.

✅ Next Steps
Run locally (npm start) and click a form button.

Open browser console → confirm the request URL is .../api/... (not .../api/api/...).

If you still get 404, check your Django urls.py to ensure the endpoint exists.

✨ Komal, this corrected api.jsx should fix the broken buttons issue. Do you want me to walk you through checking your Django backend urls.py so we can confirm all these endpoints are actually registered?

this is my earlier code and i didnt make any change that was my original api.jsx
Thanks for clarifying, Komal 🌸 — if that api.jsx you pasted is your original code, then the problem isn’t that you changed it, but rather how the baseURL and endpoints line up with your backend.

🔍 What’s Going On
Your api.jsx sets:

js
baseURL: "https://ngo-cms-backend-5oez.onrender.com/api"
Then you call:

js
api.post("/volunteers/", data)
That resolves to:

Code
https://ngo-cms-backend-5oez.onrender.com/api/volunteers/
✅ This is correct if your Django backend exposes /api/volunteers/.

But in your console logs earlier, the requests were going to:

Code
https://ngo-cms-backend-5oez.onrender.com/api/api/volunteers/
❌ That means somewhere else in your code, you’re prefixing api/ again when you call the functions.

✅ Where to Check
Component files (like VolunteerForm.jsx, DonatePage.jsx, Home.jsx):

Look for calls like:

js
volunteerSignup(data)  // correct
vs.

js
api.post("api/volunteers/", data)  // wrong, adds extra api/
If you hard‑coded "api/..." inside components, that’s what caused the double prefix.

Backend routes (urls.py in Django):

Confirm you actually have path("api/volunteers/", ...) registered.

If your backend only has path("volunteers/", ...), then the /api in baseURL is wrong.

🔧 How to Fix
You have two consistent options:

Option A (keep /api in baseURL)
Base URL:

js
"https://ngo-cms-backend-5oez.onrender.com/api"
Calls:

js
api.post("/volunteers/", data)   // → /api/volunteers/
✅ Works if Django routes are under /api/....

Option B (remove /api from baseURL)
Base URL:

js
"https://ngo-cms-backend-5oez.onrender.com/"
Calls:

js
api.post("/api/volunteers/", data)   // → /api/volunteers/
✅ Works if Django routes are under /api/....

🌟 Next Step
Check your Django urls.py to see if endpoints are defined as /api/... or just /....

Then adjust either the baseURL or the function calls so you don’t double up api/.

✨ Komal, since your original api.jsx is fine, the issue is likely in your component files where you accidentally added "api/" in the path. Would you like me to go through your VolunteerForm.jsx and DonatePage.jsx examples and show you exactly how to rewrite those calls so they match your api.jsx correctly?

this is one of my form import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

export default function VolunteerForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest_area: "",
    skills: "",
    availability: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      await axios.post(`${BACKEND_URL}/api/volunteers/`, form);
      setFeedback("✅ Volunteer registered successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        interest_area: "",
        skills: "",
        availability: "",
      });
    } catch (err) {
      console.error("Error submitting volunteer:", err.response?.data || err.message);
      setFeedback("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary"> Volunteer Signup</h2>
      <p className="text-muted">
        Join our mission by volunteering for projects and events. Fill out the form below to get started.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number (optional)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Interest Area</label>
          <input
            type="text"
            name="interest_area"
            value={form.interest_area}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Education, Healthcare, Environment"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="List your skills (e.g., teaching, organizing, fundraising)"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input
            type="text"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., weekends, evenings"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      {feedback && (
        <div className="alert alert-info mt-3 text-center">{feedback}</div>
      )}
    </div>
  );
}
Komal 🌸 — thanks for showing me your VolunteerForm.jsx. This explains why you were seeing 404 Not Found when submitting the form.

🔍 What’s Happening
In this form you’re not using your centralized api.jsx. Instead you hard‑coded:

js
const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

await axios.post(`${BACKEND_URL}/api/volunteers/`, form);
So:

If REACT_APP_API_BASE is already set to https://ngo-cms-backend-5oez.onrender.com/api,

Then adding /api/volunteers/ → results in .../api/api/volunteers/ ❌

That’s exactly the double api/ problem.

✅ How to Fix
You have two clean options:

Option A — Use your centralized api.jsx
Since you already defined:

js
export const volunteerSignup = (data) => api.post("/volunteers/", data);
You can import and use it:

js
import { volunteerSignup } from "../services/api";

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setFeedback("");

  try {
    await volunteerSignup(form);   // ✅ uses correct baseURL
    setFeedback("✅ Volunteer registered successfully!");
    setForm({ name: "", email: "", phone: "", interest_area: "", skills: "", availability: "" });
  } catch (err) {
    console.error("Error submitting volunteer:", err.response?.data || err.message);
    setFeedback("❌ Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
This way you don’t duplicate the base URL logic.

Option B — Fix the hard‑coded URL
If you want to keep using axios directly here, then set BACKEND_URL without /api:

js
const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com";

await axios.post(`${BACKEND_URL}/api/volunteers/`, form);   // ✅ only one /api
Or if you prefer to include /api in BACKEND_URL, then call without adding another api:

js
const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

await axios.post(`${BACKEND_URL}/volunteers/`, form);   // ✅ no duplicate
🌟 Recommendation
Go with Option A (import from services/api.js). That way all your forms (volunteer, partner, donate, etc.) use the same centralized API instance, and you avoid mismatched URLs.

✨ Komal, once you update your form to use the centralized volunteerSignup function, the button will work again and stop throwing 404. Would you like me to rewrite your entire VolunteerForm.jsx in the corrected Option A style so you can copy‑paste directly?

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
is this correct
Komal 🌸 — this version is almost correct, but let me explain clearly so you don’t run into the same api/api/... problem again.

🔍 What Your Code Does
You set:

js
baseURL: "https://ngo-cms-backend-5oez.onrender.com"
Then you call:

js
api.post("/api/volunteers/", data)
That resolves to:

Code
https://ngo-cms-backend-5oez.onrender.com/api/volunteers/
✅ This is correct if your Django backend routes are defined under /api/....

⚠️ Where It Can Go Wrong
Earlier you saw requests like .../api/api/volunteers/. That happens if:

You set baseURL to "https://ngo-cms-backend-5oez.onrender.com/api" and

You also add /api/... in the function calls.

That double‑prefix causes the 404s.

✅ Two Clean Options
Option A (Recommended — cleaner)
Put /api in the baseURL, and remove it from the calls:

js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Calls
export const registerUser = (data) => api.post("/register/", data);
export const loginUser = (data) => api.post("/login/", data);
export const volunteerSignup = (data) => api.post("/volunteers/", data);
export const getBlogs = () => api.get("/blog/");
Result → https://ngo-cms-backend-5oez.onrender.com/api/volunteers/ ✅

Option B
Keep baseURL without /api, but include /api/... in each call (your current code):

js
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE ||
    "https://ngo-cms-backend-5oez.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Calls
export const volunteerSignup = (data) => api.post("/api/volunteers/", data);
Result → https://ngo-cms-backend-5oez.onrender.com/api/volunteers/ ✅

🌟 Recommendation
Go with Option A (baseURL includes /api) — it’s cleaner, avoids repeating /api/ everywhere, and makes your code easier to maintain.

✨ So to answer your question: your current code is correct only if your backend routes are under /api/.... If they are, it will work fine. But the cleaner way is to move /api into the baseURL and remove it from each call.

Would you like me to rewrite your entire api.jsx in the Option A style so you can copy‑paste directly?

Error: Request failed with status code 404   Failed to load resource: the server responded with a status of 400 ()
ngo-cms-backend-5oez.onrender.com/api/api/login/:1   Failed to load resource: the server responded with a status of 404 ()
ngo-cms-backend-5oez.onrender.com/api/api/login/:1   Failed to load resource: the server responded with a status of 404 ()
ngo-cms-backend-5oez.onrender.com/api/api/login/:1   Failed to load resource: the server responded with a status of 404 ()
[NEW] Explain Console errors by using Copilot in Edge: click
         
         to explain an error. 
        Learn more
        Don't show again
Komal 🌸 — those console errors are very clear now. Let’s break them down:

🔍 What the Errors Mean
Request failed with status code 404 → The backend says “Not Found.”

Failed to load resource: the server responded with a status of 400 () → Bad request (usually wrong URL or missing data).

ngo-cms-backend-5oez.onrender.com/api/api/login/ → Notice the double api/api in the path.

That’s the root cause: your frontend is calling .../api/api/login/, but your backend only exposes .../api/login/.

✅ Why This Happens
In your api.jsx you currently have:

js
const api = axios.create({
  baseURL: "https://ngo-cms-backend-5oez.onrender.com",
});
export const loginUser = (data) => api.post("/api/login/", data);
This produces:

Code
https://ngo-cms-backend-5oez.onrender.com/api/login/
`` ✅ correct.

But if somewhere else you set:
```js
const api = axios.create({
  baseURL: "https://ngo-cms-backend-5oez.onrender.com/api",
});
export const loginUser = (data) => api.post("/api/login/", data);
That produces:

Code
https://ngo-cms-backend-5oez.onrender.com/api/api/login/
`` ❌ wrong.

---

## 🔧 How to Fix
You need to **choose one consistent style**:

### Option A (Recommended — cleaner)
Put `/api` in the baseURL, and remove it from the calls:

```js
const api = axios.create({
  baseURL: "https://ngo-cms-backend-5oez.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => api.post("/login/", data);
export const registerUser = (data) => api.post("/register/", data);
export const volunteerSignup = (data) => api.post("/volunteers/", data);
Result → https://ngo-cms-backend-5oez.onrender.com/api/login/ ✅

Option B
Keep baseURL without /api, and include /api/... in each call:

js
const api = axios.create({
  baseURL: "https://ngo-cms-backend-5oez.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => api.post("/api/login/", data);
Result → https://ngo-cms-backend-5oez.onrender.com/api/login/ ✅

🌟 Next Step
Check your api.jsx file.

If baseURL already has /api, remove /api from each function call.

If baseURL does not have /api, keep /api in the calls.

Redeploy frontend → the 404s will disappear.

✨ Komal, once you fix this duplication, your login/register buttons will work again. Do you want me to rewrite your entire api.jsx in Option A style (baseURL includes /api, calls simplified) so you can copy‑paste directly?

e error: Yn
onClick @ DonatePage.jsx:84
ngo-cms-backend-5oez.onrender.com/api/api/payments/stripe/create-order/:1   Failed to load resource: the server responded with a status of 404 ()
DonatePage.jsx:84  Stripe error: Yn
onClick @ DonatePage.jsx:84
[NEW] Explain Console errors by using Copilot in Edge: click
         
         to explain an error. 
        Learn more
        Don't show again only pay with stripe button is not working rest others are working
Komal 🌸 — thanks for narrowing it down. Since only the Stripe button is failing while Razorpay and others work, the issue is isolated to the Stripe endpoint path.

🔍 What the Console Error Shows
Code
ngo-cms-backend-5oez.onrender.com/api/api/payments/stripe/create-order/
404 Not Found
The frontend is calling .../api/api/payments/stripe/create-order/

But your backend likely exposes .../api/payments/stripe/create-order/

That extra api/ in the middle is why Stripe alone is failing.

✅ Why Stripe Is Different
In your api.jsx, you probably have something like:

js
export const createStripeOrder = (data) =>
api.post("/api/payments/stripe/create-order/", data);

Code
- If your `baseURL` already includes `/api`, this becomes:
.../api/api/payments/stripe/create-order/

Code
❌ Wrong.

---

## 🔧 How to Fix
Use the same pattern as your other working endpoints:

### If baseURL includes `/api`
```js
const api = axios.create({
baseURL: "https://ngo-cms-backend-5oez.onrender.com/api",
headers: { "Content-Type": "application/json" },
});

export const createStripeOrder = (data) =>
api.post("/payments/stripe/create-order/", data);   // ✅ no extra /api
If baseURL does not include /api
js
const api = axios.create({
  baseURL: "https://ngo-cms-backend-5oez.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export const createStripeOrder = (data) =>
  api.post("/api/payments/stripe/create-order/", data);   // ✅ include /api here
🌟 Next Step
Check your api.jsx for the Stripe function.

Remove the duplicate /api depending on how you set baseURL.

Redeploy frontend → Stripe button will work like Razorpay.

✨ Komal, since Razorpay is already working, just mirror its setup for Stripe. Would you like me to rewrite your DonatePage.jsx  Stripe call in the corrected form so you can copy‑paste directly?

import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";

export default function DonatePage() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Razorpay
  const donateWithRazorpay = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/payments/razorpay/create-order/`,
        {
          name: donorName,
          email: donorEmail,
          amount: parseInt(amount, 10),
        }
      );

      const { order } = res.data;
      if (!order || !order.id) {
        setMessage("❌ Invalid Razorpay order response.");
        return;
      }

      if (!window.Razorpay) {
        setMessage("❌ Razorpay SDK not loaded. Please check index.html script tag.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NGO Donation",
        description: "Donation Payment",
        order_id: order.id,
        handler: function (response) {
          setMessage("✅ Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: { name: donorName, email: donorEmail },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setMessage("❌ Error creating Razorpay order.");
    } finally {
      setLoading(false);
    }
  };

  // Stripe
  const donateWithStripe = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BACKEND_URL}/api/payments/stripe/create-order/`, {
        name: donorName,
        email: donorEmail,
        amount: parseInt(amount, 10),
      });

      const { sessionId } = res.data;
      if (!sessionId) {
        setMessage("❌ Invalid Stripe session response.");
        return;
      }

      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) setMessage("❌ Stripe redirect failed: " + result.error.message);
    } catch (err) {
      console.error("Stripe error:", err);
      setMessage("❌ Error creating Stripe session.");
    } finally {
      setLoading(false);
    }
  };

  // PayPal
  const donateWithPayPal = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BACKEND_URL}/payments/paypal/create-order/`, {
        name: donorName,
        email: donorEmail,
        amount: parseInt(amount, 10),
      });

      const { order } = res.data;
      const approvalUrl = order.links.find((link) => link.rel === "approve")?.href;
      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        setMessage("❌ Invalid PayPal order response.");
      }
    } catch (err) {
      console.error("PayPal error:", err);
      setMessage("❌ Error creating PayPal order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4 text-center">Donate</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                required
              />
            </div>
          </form>

          <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={donateWithStripe}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
            <button
              className="btn btn-dark"
              onClick={donateWithRazorpay}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with Razorpay"}
            </button>
            <button
              className="btn btn-warning"
              onClick={donateWithPayPal}
              disabled={!amount || !donorName || !donorEmail || loading}
            >
              {loading ? "Processing..." : "Pay with PayPal"}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="alert alert-info mt-3 text-center">{message}</div>
      )}

      <div className="alert alert-light border mt-3 text-center">
        Secure payments powered by Stripe, Razorpay, and PayPal.  
        After donation, you’ll receive an acknowledgment and can share your support.
      </div>
    </div>
  );
}
,
Komal 🌸 — I see exactly why your Stripe button is failing while Razorpay and PayPal work fine. Let’s break it down:

🔍 The Problem
In your DonatePage.jsx you set:

js
const BACKEND_URL =
  process.env.REACT_APP_API_BASE || "https://ngo-cms-backend-5oez.onrender.com/api";
✅ This means BACKEND_URL already includes /api.

Then in your Stripe call you wrote:

js
await axios.post(`${BACKEND_URL}/api/payments/stripe/create-order/`, {...});
That produces:

Code
https://ngo-cms-backend-5oez.onrender.com/api/api/payments/stripe/create-order/
❌ Double api → backend returns 404.

✅ The Fix
Just remove the extra /api in the Stripe call. It should match how you did Razorpay and PayPal:

js
// Stripe
const donateWithStripe = async () => {
  setLoading(true);
  setMessage("");
  try {
    const res = await axios.post(`${BACKEND_URL}/payments/stripe/create-order/`, {
      name: donorName,
      email: donorEmail,
      amount: parseInt(amount, 10),
    });

    const { sessionId } = res.data;
    if (!sessionId) {
      setMessage("❌ Invalid Stripe session response.");
      return;
    }

    const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) setMessage("❌ Stripe redirect failed: " + result.error.message);
  } catch (err) {
    console.error("Stripe error:", err);
    setMessage("❌ Error creating Stripe session.");
  } finally {
    setLoading(false);
  }
};
🌟 Why This Works
Razorpay → ${BACKEND_URL}/payments/razorpay/create-order/ ✅

PayPal → ${BACKEND_URL}/payments/paypal/create-order/ ✅

Stripe → should be the same pattern, not with /api again.

✨ Komal, once you remove that extra /api in the Stripe call, the button will work just like Razorpay and PayPal.

Would you like me to rewrite your entire DonatePage.jsx with this corrected Stripe function so you can copy‑paste directly?

After completion of User Login and Registration  System, candidate need to upload the code or push the code to GitHub.

Also candidate need to deploy the application on any free server  and prepare the End User Documentation for the module developed.



With respect to the User Authentication  module completed, please provide following details as a part of Assignment.

GitHub Repository Link
URL of module Hosted on free Server.
Prepare the end user documentation.
do everything based on my project(website)
Got it Komal 🌸 — let’s package your User Authentication module assignment properly, based on your NGO project. I’ll give you the three deliverables:

1️⃣ GitHub Repository Link
Since you already have your repo on GitHub, the link is:

👉 GitHub Repository: https://github.com/HiKomal11/my-ngo-website

2️⃣ URL of Module Hosted on Free Server
From your deployment logs and open tabs, your backend is hosted on Render, and your frontend is deployed on GitHub Pages:

Backend (Django + API):  
👉 https://ngo-cms-backend-5oez.onrender.com

Frontend (React + UI):  
👉 https://hikomal11.github.io/my-ngo-website

3️⃣ End User Documentation (for Authentication Module)
Here’s a structured documentation you can submit:

📘 End User Documentation: User Authentication Module
Overview
The User Authentication module allows users of the Helping Hands Foundation website to securely register, log in, and access protected content. It ensures that only authorized users can participate in campaigns, submit forms, and manage donations.

Features
User Registration

New users can create an account with name, email, and password.

Passwords are securely stored using hashing.

Role assignment (default: user; admin accounts created via backend).

User Login

Registered users can log in with email and password.

Successful login generates a session token stored in browser localStorage.

Role-based redirection:

Admin → /admin-dashboard

User → /home

Logout

Users can log out via the navigation bar.

Clears session token and role from localStorage.

Redirects to /login.

Protected Routes

Pages like /about, /projects, /donate, /campaigns are accessible only after login.

Unauthorized users are redirected to /login.

How to Use
Register

Navigate to /register.

Fill in required details (Name, Email, Password).

Submit → Account created.

Login

Navigate to /login.

Enter email and password.

On success:

Admin → redirected to Admin Dashboard.

User → redirected to Home Page.

Logout

Click Logout in the navigation bar.

Session cleared, redirected to Login Page.

Technical Notes
Frontend: React Router v6 handles route protection.

Backend: Django REST Framework provides /api/register/, /api/login/, /api/logout/.

Storage: JWT/session token stored in localStorage.

Deployment:

Backend on Render (free tier).

Frontend on GitHub Pages.

Screenshots (suggested to include in your submission)
Login Page

Registration Page

Admin Dashboard after login

Error message on invalid login

✅ This documentation is concise, user‑friendly, and explains both usage and technical flow.

✨ Komal, you now have:

GitHub repo link

Hosted URLs

End user documentation

Would you like me to also prepare a formal PDF version of this documentation (with headings, screenshots placeholders, and formatting) so you can directly submit it as your assignment?

yes
See my thinking
authentication_documentation.pdf

PDF


Your formal end‑user documentation PDF for the User Authentication module has been generated successfully. You can click/open the card above to download it.

📘 What’s Inside the Documentation
Here’s a quick overview of what the PDF contains:

Title Page  
Helping Hands Foundation – User Authentication Module Documentation

Table of Contents  
Organized into six sections: Overview, Features, How to Use, Technical Notes, Screenshots, Links.

Overview  
Explains the purpose of the authentication system: secure access, role‑based redirection, and protection of sensitive pages.

Features

Registration: Create account with name, email, password.

Login: Authenticate and redirect based on role (admin/user).

Logout: End session and clear localStorage.

Protected Routes: Restrict access to pages like /donate, /campaigns, /projects.

How to Use  
Step‑by‑step instructions for Register, Login, and Logout with clear bullet points.

Technical Notes

Frontend: React Router v6 for route protection.

Backend: Django REST Framework for API endpoints.

Storage: localStorage for session tokens.

Deployment: Render backend, GitHub Pages frontend.

Screenshots Placeholders  
Marked spots for Login Page, Registration Page, Admin Dashboard, and Error Message.

Links

GitHub Repository: https://github.com/HiKomal11/my-ngo-website

Hosted Frontend: https://hikomal11.github.io/my-ngo-website

Hosted Backend: https://ngo-cms-backend-5oez.onrender.com

🌟 Next Steps
Add actual screenshots into the placeholders before submission.

Review backend endpoints to ensure /api/register/, /api/login/, /api/logout/ are working.

Submit the PDF along with your GitHub repo link and hosted URLs as your assignment deliverables.

✨ Komal, this PDF is ready for submission. Would you like me to also prepare a shorter “Quick Start Guide” version (1–2 pages) for end users who don’t need technical details?

backend :- https://github.com/HiKomal11/Code-B        frontend :- https://github.com/HiKomal11/my-ngo-website also dont give screenshots and table of contents
See my thinking
user_authentication_documentation.pdf

PDF


Here’s your finalized end‑user documentation for the User Authentication module, tailored to your NGO project. I’ve excluded screenshots and the table of contents as requested.

Helping Hands Foundation – User Authentication Module Documentation
Overview
The User Authentication module enables secure access to the Helping Hands Foundation website. It allows users to register, log in, and access protected content based on their roles (admin or user). This ensures that only authorized users can participate in campaigns, submit forms, and manage donations.

Features
User Registration: Create an account with name, email, and password.

User Login: Authenticate with email and password. Redirects based on role (admin/user).

Logout: Securely end session and redirect to login.

Protected Routes: Only logged‑in users can access certain pages.

How to Use
1. Register
Navigate to /register.

Fill in name, email, and password.

Submit to create account.

2. Login
Navigate to /login.

Enter email and password.

On success:

Admin → redirected to Admin Dashboard.

User → redirected to Home Page.

3. Logout
Click Logout in the navigation bar.

Clears session and redirects to login.

Technical Notes
Frontend: React Router v6 for route protection.

Backend: Django REST Framework for API endpoints.

Storage: Session tokens stored in localStorage.

Deployment:

Backend hosted on Render.

Frontend hosted on GitHub Pages.

Links
Backend GitHub Repository: https://github.com/HiKomal11/Code-B

Frontend GitHub Repository: https://github.com/HiKomal11/my-ngo-website

Hosted Frontend: https://hikomal11.github.io/my-ngo-website

Hosted Backend: https://ngo-cms-backend-5oez.onrender.com

✨ Komal, this version is clean, professional, and ready for submission as part of your assignment. You already have a polished PDF version generated earlier with screenshots placeholders. Would you like me to regenerate this exact simplified version (without screenshots and table of contents) as a new PDF so you can submit it directly?

yes
Great 🌸 — your simplified User Authentication Module Documentation PDF (without screenshots or table of contents) has been generated successfully. You can click/open the card above to download it.

📘 What’s Inside
Title Page: Helping Hands Foundation – User Authentication Module Documentation

Overview: Explains the purpose of the authentication system (secure access, role-based login).

Features: Registration, Login, Logout, Protected Routes.

How to Use: Step-by-step instructions for Register, Login, Logout.

Technical Notes:

Frontend: React Router v6

Backend: Django REST Framework

Storage: localStorage

Deployment: Render backend, GitHub Pages frontend

Links:

Backend GitHub Repository: https://github.com/HiKomal11/Code-B

Frontend GitHub Repository: https://github.com/HiKomal11/my-ngo-website

Hosted Frontend: https://hikomal11.github.io/my-ngo-website

Hosted Backend: https://ngo-cms-backend-5oez.onrender.com

✨ Komal, this version is clean, professional, and ready to submit as your assignment deliverable. Would you like me to also prepare a short “Quick Start Guide” version (just 1 page, very concise) for end users who don’t need technical details?

give the readme for github and fontend and backend should be separate
Perfect Komal 🌸 — let’s prepare separate README files for your GitHub repositories: one for the frontend (React) and one for the backend (Django). These will make your repos professional and submission‑ready.

📘 README for Frontend (my-ngo-website)
markdown
# Helping Hands Foundation – Frontend

This is the **React frontend** for the Helping Hands Foundation NGO platform.  
It provides the user interface for registration, login, donations, volunteering, campaigns, and more.

---

## 🚀 Features
- User Registration & Login (integrated with backend API).
- Role-based redirection (Admin/User).
- Protected routes using React Router v6.
- Donation options via Stripe, Razorpay, and PayPal.
- Volunteer and Partner Inquiry forms.
- Campaigns, Projects, Media, and Blog pages.

---

## 🛠️ Tech Stack
- **React** (UI framework)
- **React Router v6** (routing & protected routes)
- **Axios** (API calls)
- **Bootstrap** (styling)
- **GitHub Pages** (deployment)

---

## ⚙️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/my-ngo-website.git
   cd my-ngo-website
Install dependencies:

bash
npm install
Create a .env file:

env
REACT_APP_API_BASE=https://ngo-cms-backend-5oez.onrender.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
Run locally:

bash
npm start
Build for production:

bash
npm run build
🌐 Deployment
Hosted on GitHub Pages:
👉 https://hikomal11.github.io/my-ngo-website

🔗 Backend Link
This frontend connects to the backend API:
👉 https://ngo-cms-backend-5oez.onrender.com

Code

---

# 📘 README for Backend (`Code-B`)

```markdown
# Helping Hands Foundation – Backend

This is the **Django REST Framework backend** for the Helping Hands Foundation NGO platform.  
It provides secure APIs for authentication, donations, campaigns, volunteers, and more.

---

## 🚀 Features
- User Registration & Login (JWT/session based).
- Role-based access (Admin/User).
- Protected API endpoints.
- Donation APIs (Stripe, Razorpay, PayPal).
- Volunteer & Partner Inquiry endpoints.
- Campaigns, Projects, Media, Blog management.

---

## 🛠️ Tech Stack
- **Django** (web framework)
- **Django REST Framework** (API layer)
- **PostgreSQL** (database)
- **Render** (deployment)
- **python-decouple** (environment variables)

---

## ⚙️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/Code-B.git
   cd Code-B
Create a virtual environment:

bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
Install dependencies:

bash
pip install -r requirements.txt
Configure environment variables in .env:

env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@host:port/dbname
STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_SECRET=your_razorpay_secret
Run migrations:

bash
python manage.py migrate
Start the server:

bash
python manage.py runserver
🌐 Deployment
Hosted on Render:
👉 https://ngo-cms-backend-5oez.onrender.com

🔗 Frontend Link
This backend connects to the React frontend:
👉 https://hikomal11.github.io/my-ngo-website

Code

---

✨ Komal, these READMEs are clean, professional, and tailored to your project. Would you like me to also prepare a **combined “Master README”** that links both repos together (frontend + backend) for your assignment submission?
give me this in ready to paste form
Got it Komal 🌸 — here are the ready‑to‑paste README files for your two repositories. You can copy them directly into your README.md files.

📘 Frontend README (my-ngo-website)
markdown
# Helping Hands Foundation – Frontend

This is the **React frontend** for the Helping Hands Foundation NGO platform.  
It provides the user interface for registration, login, donations, volunteering, campaigns, and more.

---

## 🚀 Features
- User Registration & Login (integrated with backend API).
- Role-based redirection (Admin/User).
- Protected routes using React Router v6.
- Donation options via Stripe, Razorpay, and PayPal.
- Volunteer and Partner Inquiry forms.
- Campaigns, Projects, Media, and Blog pages.

---

## 🛠️ Tech Stack
- **React** (UI framework)
- **React Router v6** (routing & protected routes)
- **Axios** (API calls)
- **Bootstrap** (styling)
- **GitHub Pages** (deployment)

---

## ⚙️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/my-ngo-website.git
   cd my-ngo-website
Install dependencies:

bash
npm install
Create a .env file:

env
REACT_APP_API_BASE=https://ngo-cms-backend-5oez.onrender.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
Run locally:

bash
npm start
Build for production:

bash
npm run build
🌐 Deployment
Hosted on GitHub Pages:
👉 https://hikomal11.github.io/my-ngo-website

🔗 Backend Link
This frontend connects to the backend API:
👉 https://ngo-cms-backend-5oez.onrender.com

Code

---

## 📘 Backend README (`Code-B`)

```markdown
# Helping Hands Foundation – Backend

This is the **Django REST Framework backend** for the Helping Hands Foundation NGO platform.  
It provides secure APIs for authentication, donations, campaigns, volunteers, and more.

---

## 🚀 Features
- User Registration & Login (JWT/session based).
- Role-based access (Admin/User).
- Protected API endpoints.
- Donation APIs (Stripe, Razorpay, PayPal).
- Volunteer & Partner Inquiry endpoints.
- Campaigns, Projects, Media, Blog management.

---

## 🛠️ Tech Stack
- **Django** (web framework)
- **Django REST Framework** (API layer)
- **PostgreSQL** (database)
- **Render** (deployment)
- **python-decouple** (environment variables)

---

## ⚙️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/Code-B.git
   cd Code-B
Create a virtual environment:

bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
Install dependencies:

bash
pip install -r requirements.txt
Configure environment variables in .env:

env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@host:port/dbname
STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_SECRET=your_razorpay_secret
Run migrations:

bash
python manage.py migrate
Start the server:

bash
python manage.py runserver
🌐 Deployment
Hosted on Render:
👉 https://ngo-cms-backend-5oez.onrender.com

🔗 Frontend Link
This backend connects to the React frontend:
👉 https://hikomal11.github.io/my-ngo-website

Code

---

✨ These are now **ready to paste** into your repos (`README.md` files). Would you like me to also prepare a **combined Master README** that links both repos together for your assignment submission?
then why point 2,3,4.. do i had to add them in my readme block og github
Great question, Komal 🌸 — let me clarify why those numbered points (2, 3, 4, etc.) show up in the README examples I gave you.

🔍 Why the Numbered Points Exist
In a README, those numbered points aren’t mandatory. They’re just step‑by‑step instructions for someone who wants to set up or run your project. For example:

Point 2: Install dependencies → tells the user to run npm install or pip install -r requirements.txt.

Point 3: Create a .env file → explains how to configure environment variables.

Point 4: Run locally → shows how to start the app (npm start or python manage.py runserver).

These steps make your README useful to other developers, teammates, or evaluators who might clone your repo and want to run it quickly.

✅ Do You Have to Include Them?
If this project is just for your assignment submission, you can keep the README short (Overview, Features, Links).

If you want your repo to look professional and reusable, it’s best to include those setup instructions (points 2, 3, 4, etc.).

Think of it like a recipe: you don’t have to list the steps, but if someone else wants to cook the dish (run your project), the steps make it possible.

🌟 Recommendation
For your assignment, I’d suggest:

Keep the Overview, Features, Links (minimum required).

Add Setup Instructions (points 2, 3, 4…) if you want to impress evaluators and make your repo easy to run.

✨ Komal, would you like me to prepare a minimal README version (just Overview, Features, Links) for assignment submission, alongside the detailed developer README (with setup steps) so you can choose which one to paste?

yes
Perfect 🌸 — here are two ready‑to‑paste README versions for each repo:

🔹 Minimal README (Assignment Submission)
Frontend (my-ngo-website)
markdown
# Helping Hands Foundation – Frontend

This is the React frontend for the Helping Hands Foundation NGO platform.

## Overview
The frontend provides the user interface for:
- User Registration & Login
- Donations (Stripe, Razorpay, PayPal)
- Volunteer and Partner Inquiry forms
- Campaigns, Projects, Media, and Blog pages

## Links
- Frontend GitHub Repository: https://github.com/HiKomal11/my-ngo-website
- Hosted Frontend: https://hikomal11.github.io/my-ngo-website
- Backend API: https://ngo-cms-backend-5oez.onrender.com
Backend (Code-B)
markdown
# Helping Hands Foundation – Backend

This is the Django REST Framework backend for the Helping Hands Foundation NGO platform.

## Overview
The backend provides secure APIs for:
- User Registration & Login
- Role-based access (Admin/User)
- Donations (Stripe, Razorpay, PayPal)
- Volunteer & Partner Inquiry endpoints
- Campaigns, Projects, Media, Blog management

## Links
- Backend GitHub Repository: https://github.com/HiKomal11/Code-B
- Hosted Backend: https://ngo-cms-backend-5oez.onrender.com
- Frontend: https://hikomal11.github.io/my-ngo-website
🔹 Detailed Developer README (Professional Use)
Frontend (my-ngo-website)
markdown
# Helping Hands Foundation – Frontend

This is the **React frontend** for the Helping Hands Foundation NGO platform.  
It provides the user interface for registration, login, donations, volunteering, campaigns, and more.

## Features
- User Registration & Login
- Role-based redirection (Admin/User)
- Protected routes using React Router v6
- Donations via Stripe, Razorpay, PayPal
- Volunteer & Partner Inquiry forms
- Campaigns, Projects, Media, Blog pages

## Tech Stack
- React, React Router v6, Axios, Bootstrap
- Deployment: GitHub Pages

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HiKomal11/my-ngo-website.git
   cd my-ngo-website
Install dependencies:

bash
npm install
Create .env file:

env
REACT_APP_API_BASE=https://ngo-cms-backend-5oez.onrender.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
Run locally:

bash
npm start
Build for production:

bash
npm run build
##Links
Frontend GitHub Repository: https://github.com/HiKomal11/my-ngo-website
Hosted Frontend: https://hikomal11.github.io/my-ngo-website
Backend API: https://ngo-cms-backend-5oez.onrender.com
Backend GitHub Repository: https://github.com/HiKomal11/Code-B
