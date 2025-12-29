import React from "react";
import ReactDOM from "react-dom/client";

// ✅ Bootstrap CSS first
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Your base styles
import "./styles/styles.css";

// ✅ Bootstrap JS bundle (for modals, dropdowns, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ FontAwesome icons
import "@fortawesome/fontawesome-free/css/all.min.css";

// ✅ Theme overrides (must come after Bootstrap)
import "./styles/theme-overrides.css";

// ✅ Routes (main app entry)
import AppRoutes from "./routes/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRoutes />);
