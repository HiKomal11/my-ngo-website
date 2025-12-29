import axios from "axios";

export function logout(navigate) {
  try {
    // Clear tokens and role
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    // Optional: clear any axios auth headers
    delete axios.defaults.headers.common["Authorization"];

    // Optional: clear other app-specific state
    sessionStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });
  } catch (err) {
    console.error("Error during logout:", err);
    // Fallback redirect
    navigate("/login", { replace: true });
  }
}
